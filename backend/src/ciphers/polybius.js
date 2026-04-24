const square = {
  'A': '11', 'B': '12', 'C': '13', 'D': '14', 'E': '15',
  'F': '21', 'G': '22', 'H': '23', 'I': '24', 'J': '24', 'K': '25',
  'L': '31', 'M': '32', 'N': '33', 'O': '34', 'P': '35',
  'Q': '41', 'R': '42', 'S': '43', 'T': '44', 'U': '45',
  'V': '51', 'W': '52', 'X': '53', 'Y': '54', 'Z': '55'
};

const reverseSquare = {};
for (const [key, value] of Object.entries(square)) {
  if (key === 'J') continue; 
  reverseSquare[value] = key;
}

export function polybiusEncrypt(text) {
  if (!text) return '';
  text = text.toUpperCase();
  const output = [];

  for (const char of text) {
    if (char === ' ') {
      output.push('/');
    } else if (square[char]) {
      output.push(square[char]);
    } else {
      output.push(char);
    }
  }

  return output.join(' ').replace(/ \/ /g, ' / ').trim();
}

export function polybiusDecrypt(ciphertext) {
  if (!ciphertext) return '';
  const tokens = ciphertext.split(' ');
  let output = '';

  for (const token of tokens) {
    if (token === '/') {
      output += ' ';
    } else if (reverseSquare[token]) {
      output += reverseSquare[token];
    } else {
      output += token; 
    }
  }

  return output;
}
