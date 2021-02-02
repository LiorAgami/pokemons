export interface ResultQuery {
	count:    number,
	next:     string,
	previous: string | null,
	results:  [object]
}