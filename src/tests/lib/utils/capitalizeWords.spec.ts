import { capitalizeWords } from "@/lib/utils"

describe('capitalization test', () => {

  it('should capitalize all the words of a string given only the string parameter', () => {
    expect(capitalizeWords('As the sun set behind the mountains, a single firefly sparked to life, igniting a symphony of a thousand tiny lights in the meadow.'))
    .toBe('As The Sun Set Behind The Mountains, A Single Firefly Sparked To Life, Igniting A Symphony Of A Thousand Tiny Lights In The Meadow.')
  })
  
  it('should capitalize all the words of a string except for words matched in the optional array parameter', () => {
    expect(capitalizeWords('She walked into the library, seeking stories, but found herself becoming one instead.', ['into', 'the', 'but']))
    .toBe('She Walked into the Library, Seeking Stories, but Found Herself Becoming One Instead.')
  })
  
  it('should exclude words matched in the optional array parameter regardless of the case', () => {
    expect(capitalizeWords('The old bookstore owner found a letter in an ancient book, bearing his name and a date that was yet to come.', ['A', 'IN', 'AN', 'and', 'to']))
    .toBe('The Old Bookstore Owner Found a Letter in an Ancient Book, Bearing His Name and a Date That Was Yet to Come.')
  })
})
