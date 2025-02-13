const cssButton = document.getElementById('cssBtn');
const tailwindButton = document.getElementById('tailwindBtn');

cssButton.addEventListener('click', generateCSSVariables);
tailwindButton.addEventListener('click', generateTailwindVariables);

function generateCSSVariables() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  const lines = input.split('\n');
  let cssVars = ':root {\n';

  lines.forEach(line => {
      const match = line.match(/-\s*(.+):\s*(hsl\(.+\))/i);
      if (match) {
          let varName = match[1].trim().replace(/\s+/g, '-');
          let colorValue = match[2].trim();
          cssVars += `  --${varName}: ${colorValue};\n`;
      }
  });

  cssVars += '}';
  output.textContent = cssVars;
}

function generateTailwindVariables() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  const lines = input.split('\n');
  let cssVars = '@theme {\n';

  lines.forEach(line => {
      const match = line.match(/-\s*(.+):\s*(hsl\(.+\))/i);
      if (match) {
          let varName = match[1].trim().replace(/\s+/g, '-');
          let colorValue = match[2].trim();
          cssVars += `  --color-${varName}: ${colorValue};\n`;
      }
  });

  cssVars += '}';
  output.textContent = cssVars;
}