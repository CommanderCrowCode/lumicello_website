#!/usr/bin/env python3
"""
Create OpenGraph image for Lumicello website.
Dimensions: 1200x630 (recommended for Facebook, LINE, Telegram)

Design Philosophy: "Warm Intelligence"
- Emotionally appealing for parents
- Premium but approachable
- Product-focused with clear value proposition
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
ASSETS_DIR = os.path.join(PROJECT_DIR, 'assets', 'images')
OUTPUT_PATH = os.path.join(ASSETS_DIR, 'og-image.png')

# Dimensions
WIDTH = 1200
HEIGHT = 630

# Brand Colors (from variables.css)
JEFFERSON_BLUE = (26, 43, 76)       # #1A2B4C - primary text
LUMEN_GOLD = (242, 201, 76)         # #F2C94C - accent
SOFT_CANVAS = (249, 248, 244)       # #F9F8F4 - main background
SAGE_WHISPER = (230, 235, 230)      # #E6EBE6 - calm, nature
PALE_CLAY = (240, 230, 221)         # #F0E6DD - warm, tactile
MIST_BLUE = (227, 242, 245)         # #E3F2F5 - curiosity
TEXT_SECONDARY = (94, 106, 113)     # #5E6A71


def create_warm_gradient_background(width, height):
    """Create a warm, organic gradient background."""
    img = Image.new('RGB', (width, height), SOFT_CANVAS)
    draw = ImageDraw.Draw(img)

    # Create subtle warm gradient from top-left to bottom-right
    for y in range(height):
        for x in range(width):
            # Calculate gradient factors
            factor_x = x / width
            factor_y = y / height

            # Blend colors organically
            r = int(SOFT_CANVAS[0] * 0.7 + PALE_CLAY[0] * 0.2 * factor_x + SAGE_WHISPER[0] * 0.1 * factor_y)
            g = int(SOFT_CANVAS[1] * 0.7 + PALE_CLAY[1] * 0.2 * factor_x + SAGE_WHISPER[1] * 0.1 * factor_y)
            b = int(SOFT_CANVAS[2] * 0.7 + PALE_CLAY[2] * 0.2 * factor_x + SAGE_WHISPER[2] * 0.1 * factor_y)

            # Clamp values
            r = min(255, max(0, r))
            g = min(255, max(0, g))
            b = min(255, max(0, b))

            img.putpixel((x, y), (r, g, b))

    return img


def create_simple_warm_background(width, height):
    """Create a simple warm background with subtle color blocks."""
    img = Image.new('RGB', (width, height), SOFT_CANVAS)
    draw = ImageDraw.Draw(img)

    # Add a subtle warm overlay on the left side
    for x in range(width // 3):
        alpha = 0.15 * (1 - x / (width // 3))
        for y in range(height):
            orig = SOFT_CANVAS
            r = int(orig[0] * (1 - alpha) + PALE_CLAY[0] * alpha)
            g = int(orig[1] * (1 - alpha) + PALE_CLAY[1] * alpha)
            b = int(orig[2] * (1 - alpha) + PALE_CLAY[2] * alpha)
            img.putpixel((x, y), (r, g, b))

    # Add subtle sage tint on right side
    for x in range(width * 2 // 3, width):
        alpha = 0.1 * ((x - width * 2 // 3) / (width // 3))
        for y in range(height):
            orig = img.getpixel((x, y))
            r = int(orig[0] * (1 - alpha) + SAGE_WHISPER[0] * alpha)
            g = int(orig[1] * (1 - alpha) + SAGE_WHISPER[1] * alpha)
            b = int(orig[2] * (1 - alpha) + SAGE_WHISPER[2] * alpha)
            img.putpixel((x, y), (r, g, b))

    return img


def add_decorative_shapes(img, draw):
    """Add subtle decorative shapes for visual interest."""
    # Soft gold accent circle (top right area)
    gold_with_alpha = (*LUMEN_GOLD, 40)  # Very subtle

    # Draw a large soft circle in top right
    circle_x, circle_y = WIDTH - 150, -50
    circle_radius = 200
    for i in range(circle_radius, 0, -1):
        alpha = int(25 * (i / circle_radius))
        color = (LUMEN_GOLD[0], LUMEN_GOLD[1], LUMEN_GOLD[2])
        # We'll skip this for simplicity - PIL doesn't support alpha drawing easily

    # Add bottom accent bar (gold)
    draw.rectangle([0, HEIGHT - 6, WIDTH, HEIGHT], fill=LUMEN_GOLD)

    return img


def create_og_image():
    """Create the main OG image."""
    # Create background with warm tones
    img = Image.new('RGB', (WIDTH, HEIGHT), SOFT_CANVAS)
    draw = ImageDraw.Draw(img)

    # Simple warm background - subtle gradient effect
    # Left side: slight clay warmth, Right side: slight sage
    for x in range(WIDTH):
        for y in range(HEIGHT):
            # Create subtle horizontal gradient
            factor = x / WIDTH
            r = int(SOFT_CANVAS[0] + (SAGE_WHISPER[0] - SOFT_CANVAS[0]) * factor * 0.3)
            g = int(SOFT_CANVAS[1] + (SAGE_WHISPER[1] - SOFT_CANVAS[1]) * factor * 0.3)
            b = int(SOFT_CANVAS[2] + (SAGE_WHISPER[2] - SOFT_CANVAS[2]) * factor * 0.3)

            # Add subtle vertical warmth
            v_factor = y / HEIGHT
            r = int(r + (PALE_CLAY[0] - r) * v_factor * 0.15)
            g = int(g + (PALE_CLAY[1] - g) * v_factor * 0.15)
            b = int(b + (PALE_CLAY[2] - b) * v_factor * 0.15)

            img.putpixel((x, y), (r, g, b))

    draw = ImageDraw.Draw(img)

    # Load fonts
    try:
        font_headline = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf', 52)
        font_subhead = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
        font_badge = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
        font_small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
    except OSError:
        font_headline = ImageFont.load_default()
        font_subhead = ImageFont.load_default()
        font_badge = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Load and place product image - LARGE and prominent
    product_path = os.path.join(ASSETS_DIR, 'lumibox', 'box_0-2.webp')
    if os.path.exists(product_path):
        product = Image.open(product_path)

        # Make product image large - hero size
        product_max_size = 380
        product_ratio = product_max_size / max(product.width, product.height)
        product_width = int(product.width * product_ratio)
        product_height = int(product.height * product_ratio)
        product = product.resize((product_width, product_height), Image.Resampling.LANCZOS)

        # Position product on left side, vertically centered
        product_x = 60
        product_y = (HEIGHT - product_height) // 2

        # Add soft shadow behind product
        shadow = Image.new('RGBA', (product_width + 40, product_height + 40), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.rounded_rectangle(
            [10, 10, product_width + 30, product_height + 30],
            radius=20,
            fill=(26, 43, 76, 25)
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=15))

        # Paste shadow
        img.paste(shadow, (product_x - 10, product_y + 10), shadow)

        # Paste product
        if product.mode == 'RGBA':
            img.paste(product, (product_x, product_y), product)
        else:
            img.paste(product, (product_x, product_y))

    # Load and place logo - smaller, top right
    logo_path = os.path.join(ASSETS_DIR, 'lumicello_logo.png')
    if os.path.exists(logo_path):
        logo = Image.open(logo_path)
        logo_width = 220
        logo_ratio = logo_width / logo.width
        logo_height = int(logo.height * logo_ratio)
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

        logo_x = WIDTH - logo_width - 80
        logo_y = 40

        if logo.mode == 'RGBA':
            img.paste(logo, (logo_x, logo_y), logo)
        else:
            img.paste(logo, (logo_x, logo_y))

    # Text content - right side
    text_x = 500
    text_area_width = WIDTH - text_x - 80

    # Main headline - emotional, benefit-focused
    headline = "Play designed for"
    headline2 = "every milestone"

    # Position headline
    headline_y = 180
    draw.text((text_x, headline_y), headline, font=font_headline, fill=JEFFERSON_BLUE)
    draw.text((text_x, headline_y + 60), headline2, font=font_headline, fill=JEFFERSON_BLUE)

    # Subheadline - clear value prop
    subhead = "Montessori-inspired kits for ages 0-12 months"
    subhead_y = headline_y + 145
    draw.text((text_x, subhead_y), subhead, font=font_subhead, fill=TEXT_SECONDARY)

    # LumiBox badge - pill shape
    badge_text = "LUMIBOX"
    badge_bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
    badge_width = badge_bbox[2] - badge_bbox[0]
    badge_height = badge_bbox[3] - badge_bbox[1]
    badge_padding_x = 16
    badge_padding_y = 8

    badge_x = text_x
    badge_y = subhead_y + 50

    # Draw pill-shaped badge
    draw.rounded_rectangle(
        [badge_x, badge_y,
         badge_x + badge_width + badge_padding_x * 2,
         badge_y + badge_height + badge_padding_y * 2],
        radius=20,
        fill=JEFFERSON_BLUE
    )
    draw.text(
        (badge_x + badge_padding_x, badge_y + badge_padding_y),
        badge_text,
        font=font_badge,
        fill=(255, 255, 255)
    )

    # "18 toys in each box" - small detail
    detail_text = "18 developmental toys in each box"
    detail_x = badge_x + badge_width + badge_padding_x * 2 + 20
    detail_y = badge_y + badge_padding_y
    draw.text((detail_x, detail_y), detail_text, font=font_small, fill=TEXT_SECONDARY)

    # Bottom gold accent bar
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=LUMEN_GOLD)

    # Save with optimization
    img.save(OUTPUT_PATH, 'PNG', optimize=True)
    print(f'OG image created: {OUTPUT_PATH}')

    # Check file size
    file_size = os.path.getsize(OUTPUT_PATH)
    print(f'File size: {file_size / 1024:.1f} KB')

    return OUTPUT_PATH


if __name__ == '__main__':
    create_og_image()
