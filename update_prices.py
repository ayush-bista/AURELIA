import re
import random

file_path = r"c:\Users\AAYUSH BISTA\Downloads\AURELIA\src\lib\mockData.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def multiply_price(match):
    original_price = int(match.group(1))
    # Multiply by a factor between 100 and 150 to make it "high" and "real" (NPR context)
    # Round to nearest 50 for cleaner numbers
    new_price = int(original_price * 125 / 50) * 50
    return f"price: {new_price}"

new_content = re.sub(r'price:\s*(\d+)', multiply_price, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Prices updated successfully.")
