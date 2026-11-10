export function keywordMatchesFromSuggest(
  data: ISearchKeywordSuggest | null | undefined
): string[] {
  const list = data?.result?.allMatch ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    const kw = item.keyword?.trim();
    if (!kw || seen.has(kw)) {
      continue;
    }
    seen.add(kw);
    out.push(kw);
  }
  return out;
}
