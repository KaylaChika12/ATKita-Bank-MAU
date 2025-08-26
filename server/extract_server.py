import os

# Folder dan file yang akan diproses
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(ROOT_DIR, 'output.md')
EXCLUDE_DIRS = {'node_modules', '__pycache__'}

def should_exclude(path):
    return any(part in EXCLUDE_DIRS for part in path.split(os.sep))

def extract_files_to_md():
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as output:
        for root, dirs, files in os.walk(ROOT_DIR):
            # Filter folder yang ingin dilewati
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            for file in files:
                file_path = os.path.join(root, file)
                # Lewati file script ini sendiri dan output
                if file in {os.path.basename(__file__), os.path.basename(OUTPUT_FILE)}:
                    continue
                if should_exclude(file_path):
                    continue

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        rel_path = os.path.relpath(file_path, ROOT_DIR)
                        output.write(f'\n\n## File: `{rel_path}`\n\n')
                        ext = file.split('.')[-1] if '.' in file else ''
                        output.write('```' + ext + '\n')
                        output.write(f.read())
                        output.write('\n```\n')
                except UnicodeDecodeError:
                    print(f"⚠️ Melewati file biner atau non-UTF8: {file_path}")
                except Exception as e:
                    print(f"❌ Gagal membaca {file_path}: {e}")

    print(f"✅ Ekstraksi selesai. Lihat file: {OUTPUT_FILE}")

if __name__ == '__main__':
    extract_files_to_md()
