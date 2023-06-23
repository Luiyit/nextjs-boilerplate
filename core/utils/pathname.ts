function pathnameMatches(currentPathname: string, desiredPathname : string): boolean {

  // Replace dynamic params with an regular expression to force them to match with any value
  var regexPathname = desiredPathname.replace(/\[.*?\]/g, '.*');

  // Regex to match the desired pathname
  var regex = new RegExp('^' + regexPathname + '$');

  // Check if the current pathname matches with the desired pathname
  return regex.test(currentPathname);
}


function pathnameMatchesWithLocation(desiredPathname: string): boolean {
  if(typeof window === 'undefined') return false

  // Get the current pathname
  var currentPathname = window.location.pathname;

  // Check if the current pathname matches with the desired pathname
  return pathnameMatches(currentPathname, desiredPathname);    
}

export { pathnameMatches, pathnameMatchesWithLocation }