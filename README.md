# Switcheroo - VSCode Extension

## Features

Switch files quickly between mappings.

## Usage

- Setup mappings (samples below.)
- Run `Switcheroo - Swap` command to switch files. (Shortcut : `Cmd+Shift+Y` / `Ctrl+Shift+Y`)

## Extension Settings

```json
{
  "switcheroo.mappings": [
    ["lib/app.js", "test/app_test.js"],
    ["file1.txt", "file2.txt", "file3.txt"],
    ["app/**/*.rb", "spec/**/*.rb"],
    ["**/__tests__/*.js", "**/*.js"],
    ["test/**/*.test.ts", "**/*.ts"]
  ]
}
```

## WIP

- Show message when no mapping is matched on that file.
- Windows compatability
- Add screenshot GIF.

## Release Notes

### 0.1.0

- Add dialog to create file if missing

### 0.0.2

- Add Globs pattern support for mappings eg. `app/**/*.rb`

### 0.0.1

Pre-release
