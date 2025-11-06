// to be deleted
import fetchSuggestions from '@/lib/api/fetchSuggestions'

async function main() {
  try {
    const results = await fetchSuggestions('do')
    console.log('✅ Suggestions:', results)
  } catch (err) {
    console.error('❌ Error fetching suggestions:', err)
  }
}

main()