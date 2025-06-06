export async function hasValidAPIKey(): Promise<string> {
    try {
      return 'this works'
    } catch {
      return 'catch err';
    }
}