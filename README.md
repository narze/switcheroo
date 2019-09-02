# Switcheroo - VSCode Extension

## Features

Switch files quickly between mappings.

## Extension Settings

```
{
  "switcheroo.mappings": [
    ["lib/app.js", "test/app_test.js"],
    ["file1.txt", "file2.txt", "file3.txt"],
    ["app/**/*.rb", "spec/**/*.rb"],
  ]
}
```

## WIP

- Add prompt to create new file if not exist.
- Show message when no mapping is matched on that file.
- Add screenshot GIF.

## Release Notes

### 0.0.2

- Add Globs pattern support for mappings eg. `app/**/*.rb`

### 0.0.1

Pre-release
