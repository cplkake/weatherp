export default function capitalizeWords(
  line: string,
  wordsThatDontNeedPermutation: string[] = []
): string {
  return line
    .toLowerCase()
    .split(" ")
    .map(word => {
  		if (wordsThatDontNeedPermutation.length) {
        const lowerCaseExcludedWords = wordsThatDontNeedPermutation.map(word => word.toLowerCase())
        return lowerCaseExcludedWords.indexOf(word) > -1 ? word : word[0].toUpperCase() + word.slice(1)
      }
      return word[0].toUpperCase() + word.slice(1)
    })
    .join(" ");
}
