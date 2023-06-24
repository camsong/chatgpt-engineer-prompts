function checkFunc() {
  throw new Error('This is a test error');
  return 1 + 1;
}

function main() {
  console.log('This is a test main function');
  try {
    checkFunc();
  } catch (e) {
    console.log(e.stack.split('\n')[0]);
  }
  console.log('This is a test main end function');
}

main();
