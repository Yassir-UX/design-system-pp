const fs = require('fs');
const path = require('path');

// Read token files
const primitives = JSON.parse(fs.readFileSync(path.join(__dirname, '../_Primitives.json'), 'utf8'));
const colorModes = JSON.parse(fs.readFileSync(path.join(__dirname, '../1. Color modes.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(__dirname, '../3. Spacing.json'), 'utf8'));
const radius = JSON.parse(fs.readFileSync(path.join(__dirname, '../2. Radius.json'), 'utf8'));
const typography = JSON.parse(fs.readFileSync(path.join(__dirname, '../6. Typography.json'), 'utf8'));

// Helper function to convert RGB components to hex
function rgbToHex(components) {
  const r = Math.round(components[0] * 255);
  const g = Math.round(components[1] * 255);
  const b = Math.round(components[2] * 255);
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

// Extract colors from primitives
const colors = {};
if (primitives.Colors) {
  Object.keys(primitives.Colors).forEach(colorGroup => {
    const group = primitives.Colors[colorGroup];
    const groupName = colorGroup.toLowerCase().replace(/\s+/g, '-');
    colors[groupName] = {};
    
    Object.keys(group).forEach(colorName => {
      const color = group[colorName];
      if (color.$value && color.$value.hex) {
        const cleanName = colorName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/_/g, '-');
        colors[groupName][cleanName] = color.$value.hex;
      }
    });
  });
}

// Extract colors from color modes
if (colorModes.Colors) {
  Object.keys(colorModes.Colors).forEach(colorGroup => {
    const group = colorModes.Colors[colorGroup];
    const groupName = colorGroup.toLowerCase().replace(/\s+/g, '-');
    
    if (!colors[groupName]) {
      colors[groupName] = {};
    }
    
    Object.keys(group).forEach(colorName => {
      const color = group[colorName];
      if (color.$value && color.$value.hex) {
        const cleanName = colorName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/_/g, '-');
        colors[groupName][cleanName] = color.$value.hex;
      }
    });
  });
}

// Extract spacing
const spacingTokens = {};
Object.keys(spacing).forEach(key => {
  if (key !== '$extensions' && spacing[key].$value !== undefined) {
    const cleanKey = key.replace('spacing-', '');
    spacingTokens[cleanKey] = `${spacing[key].$value}px`;
  }
});

// Extract radius
const radiusTokens = {};
Object.keys(radius).forEach(key => {
  if (key !== '$extensions' && radius[key].$value !== undefined) {
    const cleanKey = key.replace('radius-', '');
    if (radius[key].$value === 9999) {
      radiusTokens[cleanKey] = '9999px';
    } else {
      radiusTokens[cleanKey] = `${radius[key].$value}px`;
    }
  }
});

// Extract typography
const typographyTokens = {
  fontFamily: {},
  fontWeight: {},
  fontSize: {},
  lineHeight: {}
};

// Font family
if (typography['Font family']) {
  Object.keys(typography['Font family']).forEach(key => {
    const token = typography['Font family'][key];
    if (token.$value) {
      typographyTokens.fontFamily[key] = token.$value;
    }
  });
}

// Font weight
if (typography['Font weight']) {
  Object.keys(typography['Font weight']).forEach(key => {
    const token = typography['Font weight'][key];
    if (token.$value) {
      // Map weight names to numeric values for CSS
      const weightMap = {
        'Regular': '400',
        'Regular italic': '400',
        'Medium': '500',
        'Medium italic': '500',
        'Semibold': '600',
        'Semibold italic': '600',
        'Bold': '700',
        'Bold italic': '700'
      };
      typographyTokens.fontWeight[key] = weightMap[token.$value] || token.$value;
    }
  });
}

// Font size
if (typography['Font size']) {
  Object.keys(typography['Font size']).forEach(key => {
    const token = typography['Font size'][key];
    if (token.$value !== undefined) {
      typographyTokens.fontSize[key] = `${token.$value}px`;
    }
  });
}

// Line height
if (typography['Line height']) {
  Object.keys(typography['Line height']).forEach(key => {
    const token = typography['Line height'][key];
    if (token.$value !== undefined) {
      typographyTokens.lineHeight[key] = `${token.$value}px`;
    }
  });
}

// Write tokens to a JSON file for Tailwind to use
const tokens = {
  colors,
  spacing: spacingTokens,
  borderRadius: radiusTokens,
  typography: typographyTokens
};

fs.writeFileSync(
  path.join(__dirname, '../src/tokens.json'),
  JSON.stringify(tokens, null, 2)
);

console.log('✅ Tokens parsed and saved to src/tokens.json');

