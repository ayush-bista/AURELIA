import re

file_path = r"c:\Users\AAYUSH BISTA\Downloads\AURELIA\src\lib\mockData.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# specific price mapping for realism (Lowered as requested)
price_map = {
    "Sapphire Teardrop Pendant": 125000,
    "Emerald Pendant Necklace": 98000,
    "Opal Halo Necklace": 85000,
    "Golden Horizon Necklace": 65000,
    "Moonstone Pendant": 55000,
    "Floral Charm Necklace": 42000,
    "Rose Gold Choker": 38000,
    "Geometric Necklace": 32000,
    "Crystal Layered Necklace": 28000,
    "Minimal Bar Necklace": 22000
}

def update_necklace_price(match):
    full_block = match.group(0)
    
    # Extract name to lookup new price
    name_match = re.search(r'name:\s*"([^"]+)"', full_block)
    if not name_match:
        return full_block
        
    name = name_match.group(1)
    
    if name in price_map:
        new_price = price_map[name]
        # Replace the price line within this block
        updated_block = re.sub(r'price:\s*\d+', f'price: {new_price}', full_block)
        return updated_block
    
    return full_block

lines = content.split('\n')
new_lines = []
current_product_name = None

for line in lines:
    # Check for name
    name_match = re.search(r'name:\s*"([^"]+)"', line)
    if name_match:
        current_product_name = name_match.group(1)
    
    # Check for price
    if "price:" in line and current_product_name in price_map:
        new_price = price_map[current_product_name]
        line = re.sub(r'price:\s*\d+', f'price: {new_price}', line)
        current_product_name = None
        
    new_lines.append(line)

new_content = '\n'.join(new_lines)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Necklace prices updated to lower values.")
