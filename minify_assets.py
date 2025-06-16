import re
import os

def minify_css(input_file, output_file):
    with open(input_file, 'r') as f:
        content = f.read()
    
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Remove whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*([\{\}:;,])\s*', r'\1', content)
    
    with open(output_file, 'w') as f:
        f.write(content)

def minify_js(input_file, output_file):
    with open(input_file, 'r') as f:
        content = f.read()

    # A more careful approach for JS to avoid breaking things.
    # This is a very basic minifier.
    # Remove single line comments
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove leading/trailing whitespace from lines
    lines = [line.strip() for line in content.splitlines()]
    # Join lines and remove extra spaces around operators, etc.
    content = ' '.join(lines)
    content = re.sub(r'\s*([=\(\)\{\};,])\s*', r'\1', content)
    content = re.sub(r'\s*([+\-*/])\s*', r'\1', content)


    with open(output_file, 'w') as f:
        f.write(content)

if __name__ == '__main__':
    if not os.path.exists('dist'):
        os.makedirs('dist')
    if not os.path.exists('dist/css'):
        os.makedirs('dist/css')
    if not os.path.exists('dist/js'):
        os.makedirs('dist/js')

    minify_css('css/style.css', 'dist/css/style.min.css')
    minify_css('css/service-page.css', 'dist/css/service-page.min.css')
    minify_js('js/main.js', 'dist/js/main.min.js')

    print("Minification complete. Minified files are in the 'dist' directory.") 