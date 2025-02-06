# CSS variables generator

This tool is a chrome extension to generate CSS variables from a Frontend Mentor instructions.

## Usage

Input:
```md
- White: hsl(0, 0%, 100%)
- Light pink: hsl(275, 100%, 97%)
- Grayish purple: hsl(292, 16%, 49%)
- Dark purple: hsl(292, 42%, 14%)
```

Output:
```css
:root {
  --White: hsl(0, 0%, 100%);
  --Light-pink: hsl(275, 100%, 97%);
  --Grayish-purple: hsl(292, 16%, 49%);
  --Dark-purple: hsl(292, 42%, 14%);
}
```