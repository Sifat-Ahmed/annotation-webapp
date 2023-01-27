import os

def clean_dirs(dir):
    files = os.listdir(dir)
    for file in files:
        if file != '.gitkeep':
            os.remove(os.path.join(dir, file))

    print('Cleaned {} directory'.format(dir))