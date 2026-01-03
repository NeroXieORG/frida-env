#!/usr/bin/env python3
import subprocess
import sys
import time
import shutil
import paramiko

SSH_HOST = "127.0.0.1"
SSH_PORT = 2222
SSH_USER = "root"
SSH_PASSWORD = "12345"


def run(cmd, check=False, capture=False):
    return subprocess.run(
        cmd,
        shell=True,
        check=check,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
        text=True,
    )


def command_exists(cmd):
    return shutil.which(cmd) is not None


def check_frida_server():
    print("🧪 Checking frida-server...")
    result = run("frida-ps -U", capture=True)
    if result.returncode != 0:
        print("❌ frida-server not running")
        sys.exit(1)
    print("✅ frida-server OK")


def check_iproxy():
    if not command_exists("iproxy"):
        print("❌ iproxy not found. Install with: brew install libimobiledevice")
        sys.exit(1)

    result = run(f"lsof -i :{SSH_PORT}", capture=True)
    if result.returncode == 0:
        print(f"✅ iproxy already running on port {SSH_PORT}")
        return False

    print("🔌 Starting iproxy...")
    subprocess.Popen(
        ["iproxy", str(SSH_PORT), "22"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(2)
    return True


def cleanup_iproxy(started):
    if started:
        print("🧹 Stopping iproxy")
        run(f"pkill -f 'iproxy {SSH_PORT} 22'")


def test_ssh():
    print("🔐 Testing SSH connection...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        client.connect(
            hostname=SSH_HOST,
            port=SSH_PORT,
            username=SSH_USER,
            password=SSH_PASSWORD,
            timeout=5,
        )
        stdin, stdout, stderr = client.exec_command("echo SSH_OK")
        output = stdout.read().decode().strip()
        if output != "SSH_OK":
            raise RuntimeError("Unexpected SSH output")
        print("✅ SSH connection OK (password auth)")
    except Exception as e:
        print(f"❌ SSH login failed: {e}")
        sys.exit(1)
    finally:
        client.close()


def dump_app(bundle_id):
    print("🚀 Start dumping IPA...")
    result = run(f"python dump.py {bundle_id} -u {SSH_USER}")
    if result.returncode != 0:
        print("❌ dump.py failed")
        sys.exit(1)


def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <bundle_id>")
        sys.exit(1)

    bundle_id = sys.argv[1]
    print(f"📦 Target App: {bundle_id}")

    check_frida_server()
    iproxy_started = check_iproxy()
    test_ssh()
    dump_app(bundle_id)
    cleanup_iproxy(iproxy_started)

    print("🎉 Done.")


if __name__ == "__main__":
    main()
