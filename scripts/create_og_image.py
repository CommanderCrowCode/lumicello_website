#!/usr/bin/env python3
"""
Create OpenGraph image for Lumicello website.
Dimensions: 1200x630 (recommended for Facebook, LINE, Telegram)
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
ASSETS_DIR = os.path.join(PROJECT_DIR, 'assets', 'images')
OUTPUT_PATH = os.path.join(ASSETS_DIR, 'og-image.png')

# Dimensions
WIDTH = 1200
HEIGHT = 630

# Colors from brand
SOFT_CANVAS = (249, 248, 244)  # #F9F8F4 - main background
JEFFERSON_BLUE = (26, 43, 76)  # #1A2B4C - primary
LUMEN_GOLD = (242, 201, 76)    # #F2C94C - accent

def create_og_image():
    # Create base image with soft canvas background
    img = Image.new('RGB', (WIDTH, HEIGHT), SOFT_CANVAS)
    draw = ImageDraw.Draw(img)

    # Load logo
    logo_path = os.path.join(ASSETS_DIR, 'lumicello_logo.png')
    if os.path.exists(logo_path):
        logo = Image.open(logo_path)
        # Resize logo to fit nicely (max 400px wide)
        logo_width = 400
        logo_ratio = logo_width / logo.width
        logo_height = int(logo.height * logo_ratio)
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

        # Position logo at top center
        logo_x = (WIDTH - logo_width) // 2
        logo_y = 50

        # Handle transparency
        if logo.mode == 'RGBA':
            img.paste(logo, (logo_x, logo_y), logo)
        else:
            img.paste(logo, (logo_x, logo_y))

    # Load product image
    product_path = os.path.join(ASSETS_DIR, 'lumibox', 'box_0-2.webp')
    if os.path.exists(product_path):
        product = Image.open(product_path)
        # Resize product image
        product_size = 280
        product_ratio = product_size / max(product.width, product.height)
        product_width = int(product.width * product_ratio)
        product_height = int(product.height * product_ratio)
        product = product.resize((product_width, product_height), Image.Resampling.LANCZOS)

        # Position product on left side
        product_x = 80
        product_y = (HEIGHT - product_height) // 2 + 30

        # Handle transparency
        if product.mode == 'RGBA':
            img.paste(product, (product_x, product_y), product)
        else:
            img.paste(product, (product_x, product_y))

    # Add text - use default font since we may not have the brand fonts available
    try:
        # Try to load a nice font if available
        title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 42)
        subtitle_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 28)
        badge_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 20)
    except OSError:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        badge_font = ImageFont.load_default()

    # Draw badge background
    badge_text = 'LUMIBOX'
    badge_bbox = draw.textbbox((0, 0), badge_text, font=badge_font)
    badge_width = badge_bbox[2] - badge_bbox[0]
    badge_height = badge_bbox[3] - badge_bbox[1]
    badge_padding = 12
    badge_x = WIDTH - badge_width - badge_padding * 2 - 80
    badge_y = HEIGHT // 2 - 60

    # Draw rounded badge
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + badge_width + badge_padding * 2, badge_y + badge_height + badge_padding * 2],
        radius=20,
        fill=JEFFERSON_BLUE
    )
    draw.text(
        (badge_x + badge_padding, badge_y + badge_padding),
        badge_text,
        font=badge_font,
        fill=(255, 255, 255)
    )

    # Main title text
    title_lines = ['Baby development kits', 'for ages 0-12 months']
    title_y = badge_y + badge_height + badge_padding * 2 + 20
    text_x = 420

    for line in title_lines:
        draw.text((text_x, title_y), line, font=title_font, fill=JEFFERSON_BLUE)
        title_y += 50

    # Subtitle
    subtitle = '18 Montessori toys in each box'
    draw.text((text_x, title_y + 10), subtitle, font=subtitle_font, fill=(94, 106, 113))

    # Add accent bar at bottom
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=LUMEN_GOLD)

    # Save
    img.save(OUTPUT_PATH, 'PNG', quality=95)
    print(f'OG image created: {OUTPUT_PATH}')
    return OUTPUT_PATH

if __name__ == '__main__':
    create_og_image()
