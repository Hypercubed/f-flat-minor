Chomp.registerTemplate('cmp', function (task) {
  if (typeof task.templateOptions.cmp !== 'string')
    throw new Error('Cmp template expects a filename in template-options.');
  if (!task.run)
    throw new Error('Cmp template expects a run field.');
  return [{
    ...task,
    run: `${task.run.trim()} 2>/dev/null | diff --ignore-trailing-space -q - > /dev/null 2>&1 ${task.templateOptions.cmp} && \${{CHECK}}`,
    env: {
      CHECK: 'printf "  ${GRN}OK${NC} " || printf "  ${RED}FAIL${NC} "',
      RED: '\033[31m',
      GRN: '\033[32m',
      NC: '\033[0m',
      BLUE: '\033[34m'
    }
  }];
});
