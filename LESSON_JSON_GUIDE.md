# Lesson JSON Guide for CoreBites Engine

This document defines the JSON shape and authoring rules for lessons used by the `coreBites` renderer.

---

## 1. Top-level lesson structure

A lesson object must include:

- `title` (string): required
- `topic` (string): required
- `stack` (array of strings): required, must contain at least one valid stack item
- `isFree` (boolean): optional, default `false`
- `isDemo` (boolean): optional, default `false`
- `price` (number): optional, default `0`
- `synopsis` (object): required
- `sections` (array): required, must contain at least one section

Example:

```json
{
  "title": "JavaScript filter() Method",
  "topic": "filter()",
  "stack": ["JavaScript"],
  "isFree": true,
  "isDemo": false,
  "price": 0,
  "synopsis": { ... },
  "sections": [ ... ]
}
```

---

## 2. Valid stack values

Stack values are validated against this list:

- `React`
- `Node.js`
- `Express`
- `MongoDB`
- `JavaScript`
- `CSS`
- `HTML`
- `TypeScript`

Use only these exact strings.

---

## 3. Synopsis structure

The `synopsis` object must contain:

- `tagline` (string)
- `whatYouWillLearn` (array of strings)
- `estimatedTime` (string)
- `difficulty` (string) — one of: `beginner`, `intermediate`, `advanced`
- `prerequisites` (array of strings) — optional, defaults to `[]`

Example:

```json
"synopsis": {
  "tagline": "Learn how filter creates a new array by keeping matching items.",
  "whatYouWillLearn": [
    "What filter() does",
    "How filter() decides what to keep",
    "How to solve real filtering problems"
  ],
  "estimatedTime": "10 mins",
  "difficulty": "beginner",
  "prerequisites": ["Arrays", "Functions"]
}
```

---

## 4. Lesson validation rules

The backend enforces these rules:

- `sections` must be an array with at least one section
- `stack` must be an array with at least one valid stack value
- `isDemo` lessons must also be free
- `isFree` lessons cannot have a `price` greater than `0`

---

## 5. Section structure

Each section object must contain:

- `type` (string): required
- `blocks` (array): required, must contain at least one block

Supported `type` values:

- `observation`
- `interactive-question`
- `reveal`
- `script`
- `bridge`
- `critical-moment`
- `transition`
- `concept-intro`
- `mapping`
- `connection`
- `deep-explanation`
- `real-world`
- `practice-group`

Example:

```json
{
  "type": "concept-intro",
  "blocks": [ ... ]
}
```

---

## 6. Block schema and common fields

A block object can contain any of the following fields:

- `type` (string): required
- `content` (string)
- `language` (string)
- `runnable` (boolean)
- `format` (string): `mcq`, `truefalse`, `fillblank`
- `question` (string)
- `options` (array of strings)
- `answer` (string)
- `explanation` (string)
- `correctFeedback` (string)
- `wrongFeedback` (string)
- `questions` (array of question objects)
- `prompt` (string)
- `placeholder` (string)
- `rules` (array of rule objects)
- `successMessage` (string)
- `starterCode` (string)
- `expectedOutput` (string)
- `requiredPattern` (string)
- `hint` (string)

Rule object fields:

- `type` (string): one of `endsWith`, `includes`, `notIncludes`, `regex`
- `value` (string)
- `message` (string)

Allowed block `type` values:

- `observation`
- `pattern`
- `text`
- `code`
- `explanation`
- `file-quiz`
- `quiz`
- `simpler`
- `warning`
- `practice`

Note: not every block type is currently rendered in a special way, but this is the supported backend block schema.

---

## 7. Section-specific block expectations

### 7.1 `observation`

- Uses the first block
- Renders `block.content`
- Recommended block type: `observation` or `text`

Example:

```json
{
  "type": "observation",
  "blocks": [
    {
      "type": "observation",
      "content": "Imagine you have a basket of fruits..."
    }
  ]
}
```

### 7.2 `concept-intro`

- Uses the first block
- Renders `block.content`
- Recommended block type: `pattern` or `text`

Example:

```json
{
  "type": "concept-intro",
  "blocks": [
    {
      "type": "pattern",
      "content": "filter() keeps matching items and returns a new array."
    }
  ]
}
```

### 7.3 `reveal`

- Uses the first block
- Renders `block.content`

Example:

```json
{
  "type": "reveal",
  "blocks": [
    {
      "type": "warning",
      "content": "filter() does NOT change the original array."
    }
  ]
}
```

### 7.4 `script`

- Uses the first block
- Splits `block.content` by newlines and renders each line
- `block.content` should contain text or code lines

Example:

```json
{
  "type": "script",
  "blocks": [
    {
      "type": "code",
      "content": "const numbers = [1,2,3,4,5];\nconst result = numbers.filter(num => num > 3);"
    }
  ]
}
```

### 7.5 `bridge`

- Uses the first block
- Renders `block.content`

Example:

```json
{
  "type": "bridge",
  "blocks": [
    {
      "type": "text",
      "content": "This idea connects what we just learned to the next step."
    }
  ]
}
```

### 7.6 `mapping`

- Uses the first block
- Renders `block.content`

Example:

```json
{
  "type": "mapping",
  "blocks": [
    {
      "type": "text",
      "content": "num = 1 → false → removed\nnum = 4 → true → kept"
    }
  ]
}
```

### 7.7 `connection`

- Uses the first block
- Renders `block.content`

Example:

```json
{
  "type": "connection",
  "blocks": [
    {
      "type": "pattern",
      "content": "filter asks one question for every item: should this stay or go?"
    }
  ]
}
```

### 7.8 `deep-explanation`

- Uses the first block
- Renders `block.content`

Example:

```json
{
  "type": "deep-explanation",
  "blocks": [
    {
      "type": "explanation",
      "content": "filter() checks every item..."
    }
  ]
}
```

### 7.9 `real-world`

- Uses the first block
- Renders `block.content`
- Can contain code and explanation blocks, but the component uses only the first block

Example:

```json
{
  "type": "real-world",
  "blocks": [
    {
      "type": "code",
      "language": "javascript",
      "content": "const activeUsers = users.filter(user => user.active);"
    }
  ]
}
```

### 7.10 `critical-moment`

- Renders a code example from the first `code` block
- Renders all `explanation` blocks as breakdown text
- Optionally renders one `pattern` block

Example:

```json
{
  "type": "critical-moment",
  "blocks": [
    {
      "type": "code",
      "content": "const numbers = [1,2,3,4,5];\nconst result = numbers.filter(num => num > 3);"
    },
    {
      "type": "explanation",
      "content": "filter checks every item..."
    },
    {
      "type": "pattern",
      "content": "filter never mutates the original array."
    }
  ]
}
```

### 7.11 `interactive-question`

- Should include a `quiz` block
- `questionText` is taken from either:
  - a `text` block (`textBlock.content`, `prompt`, or `question`)
  - or the `quiz` block itself (`quizBlock.question` or `quizBlock.prompt`)
- Rendered quiz options come from `quizBlock.options`
- Correct answer is `quizBlock.answer`

Example:

```json
{
  "type": "interactive-question",
  "blocks": [
    {
      "type": "quiz",
      "format": "mcq",
      "question": "What does filter() return?",
      "options": ["A single value", "A new array", "The index", "Nothing"],
      "answer": "A new array",
      "correctFeedback": "Correct. filter() creates a new array.",
      "wrongFeedback": "Think about the result of selecting multiple matching items."
    }
  ]
}
```

### 7.12 `practice-group`

This section is flexible.

It can render either:

- `practice` blocks with a text input, or
- `quiz` blocks with selectable options.

#### Practice block fields

- `type`: `practice`
- `prompt` (string): displayed as the question
- `placeholder` (string): input placeholder
- `rules` (array): optional, used to validate answer
- `requiredPattern` (string): optional, used by answer checking
- `hint` (string): optional
- `successMessage` (string): optional

The renderer currently checks only the first `includes` rule or `requiredPattern`.

Example:

```json
{
  "type": "practice-group",
  "blocks": [
    {
      "type": "practice",
      "prompt": "Use filter() to keep only even numbers from the array.",
      "placeholder": "Write your code here...",
      "rules": [
        { "type": "includes", "value": "filter", "message": "You should use filter()." },
        { "type": "includes", "value": "%", "message": "Use modulo (%) to check even numbers." }
      ]
    }
  ]
}
```

#### Quiz block inside practice-group

If a block has `type: "quiz"`, the section renders answer buttons.

Example:

```json
{
  "type": "practice-group",
  "blocks": [
    {
      "type": "quiz",
      "format": "mcq",
      "question": "Which values will remain after this code?",
      "options": ["[10,15]", "[15,20]", "[20,25]", "[10,20]"],
      "answer": "[20,25]"
    }
  ]
}
```

---

## 8. Important authoring notes

### 8.1 Use the right section type

The JSON engine renders based on `section.type`. A typo in `type` will cause the section to show as unknown.

### 8.2 Every section needs blocks

A section with `blocks: []` will fail validation. Always include at least one block.

### 8.3 Quiz option arrays

`options` must be an array of strings. If omitted, the renderer will show `No answer options available.`

### 8.4 Question text fallback

If you want a clean `interactive-question` section without a separate `text` block, put the text directly in the quiz block as `question`.

### 8.5 Practice validation behavior

The current practice engine checks only:

- `block.requiredPattern`
- otherwise the first `includes` rule value in `block.rules`

That means a rule like `{ "type": "regex", ... }` is not currently used by this renderer.

### 8.6 Keep JSON small and consistent

- Use `content` for plain text or code content whenever possible
- Use `prompt` instead of `content` for practice prompts
- Use `question` for quiz text
- Avoid trailing commas in JSON
- Keep arrays of strings simple and consistent

---

## 9. Recommended JSON editing workflow

1. Draft the lesson object with top-level metadata.
2. Build each section independently.
3. Validate `stack` values and `difficulty` values against allowed enums.
4. For interactive sections, confirm `quiz` blocks include both `options` and `answer`.
5. For practice inputs, confirm that at least one rule or `requiredPattern` exists if you want answer checking.
6. Paste the JSON into the admin lesson editor and save.
7. Test the lesson in the user view.

---

## 10. Example complete lesson JSON

```json
{
  "title": "JavaScript filter() Method",
  "topic": "filter()",
  "stack": ["JavaScript"],
  "isFree": true,
  "isDemo": false,
  "price": 0,
  "synopsis": {
    "tagline": "Learn how filter creates a new array by keeping matching items.",
    "whatYouWillLearn": [
      "What filter() does",
      "How filter() decides what to keep",
      "How to solve real filtering problems"
    ],
    "estimatedTime": "10 mins",
    "difficulty": "beginner",
    "prerequisites": ["Arrays", "Functions"]
  },
  "sections": [
    {
      "type": "concept-intro",
      "blocks": [
        {
          "type": "pattern",
          "content": "filter() keeps matching items and returns a new array."
        }
      ]
    },
    {
      "type": "interactive-question",
      "blocks": [
        {
          "type": "quiz",
          "format": "mcq",
          "question": "What does filter() return?",
          "options": ["A single value", "A new array", "The index", "Nothing"],
          "answer": "A new array",
          "correctFeedback": "Correct. filter() creates a new array.",
          "wrongFeedback": "Think about the result of selecting multiple matching items."
        }
      ]
    },
    {
      "type": "practice-group",
      "blocks": [
        {
          "type": "practice",
          "prompt": "Use filter() to keep only even numbers from the array.",
          "placeholder": "Write your code here...",
          "rules": [
            { "type": "includes", "value": "filter", "message": "You should use filter()." },
            { "type": "includes", "value": "%", "message": "Use modulo (%) to check even numbers." }
          ],
          "successMessage": "Great. You filtered even numbers."
        }
      ]
    }
  ]
}
```

---

## 11. Troubleshooting common errors

- `No question text provided.` → your `interactive-question` section did not include `quiz.question` or a separate `text` block
- `Cannot read properties of undefined (reading 'content')` → a renderer expected `block.content`, but your block only had `prompt` or `question`
- `A section must have at least one block.` → `blocks` array is empty or missing
- `Free lessons cannot have a price.` → set `price` to `0` when `isFree: true`
- `A demo lesson must also be free.` → set `isFree: true` when `isDemo: true`

---

## 12. Notes for future schema extension

If you add new section or block types later, update both:

- `coreBites_Backend/app.js` block and section schema definitions
- `coreBites/src/renderer.jsx/SectionEngine.jsx` and the corresponding section component

For now, use only the section types and block patterns documented above.
