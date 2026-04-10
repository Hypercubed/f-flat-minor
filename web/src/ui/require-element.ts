export function requireElement<T extends Element>(
  root: ParentNode,
  selector: string,
  kind = "required element",
): T {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing ${kind}: ${selector}`);
  }

  return element;
}
