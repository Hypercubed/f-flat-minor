Chomp.registerTemplate('cmp', function (task) {
  if (typeof task.templateOptions.cmp !== 'string')
    throw new Error('Cmp template expects a filename in template-options.');
  if (!task.run)
    throw new Error('Cmp template expects a run field.');
  return [{
    ...task,
    run: `${task.run.trim()} 2>/dev/null | cmp --s - "${task.templateOptions.cmp}"`
  }];
});