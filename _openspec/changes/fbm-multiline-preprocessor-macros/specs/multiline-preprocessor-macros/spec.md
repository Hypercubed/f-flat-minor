## ADDED Requirements

### Requirement: Consecutive Macro Line Accumulation
The preprocessor SHALL detect consecutive adjacent lines starting with the same macro directive (`.m`, `.ff`, or `.ffp`) and accumulate the text following the directive (excluding the directive itself) into a single, multi-line macro block joined by newlines.

#### Scenario: Merging multiple consecutive .m lines
- **WHEN** the preprocessor encounters the following consecutive adjacent lines:
  ```fbm
  .m 10
  .m 20
  .m *
  ```
- **THEN** it joins the text into a single macro string `10 \n 20 \n *` and executes it as a single VM run

### Requirement: Block Directive Replacement
The preprocessor SHALL replace the entire block of consecutive macro lines in the preprocessed output stream with the combined, space-separated string representation of all numeric or symbol values remaining on the VM stack after execution.

#### Scenario: Replacing the consecutive macro block with outputs
- **WHEN** the VM executes the macro `10 \n 20 \n *`, leaving the single integer `200` on the stack
- **THEN** the preprocessor replaces the entire 3-line macro block with the single token `200` in the preprocessed output
