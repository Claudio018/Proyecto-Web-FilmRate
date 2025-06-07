import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmbdService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private language = 'es-ES';
  private headers = new HttpHeaders({
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWI2NTE5MGZiMDgwZGM1MjQwZWM3YTYyNDg1YjlhOSIsIm5iZiI6MTc0OTI1NTI1NC42OTUwMDAyLCJzdWIiOiI2ODQzODQ1NjE2NmM3MzgwNDRkZTY1MzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7dAbgVnJIrHP9BAroNKhQ126k6c20s91kJGwoM1SNo4'
  });

  constructor(private http: HttpClient,) {}

  private buildUrl(endpoint: string, params: string = ''): string {
    const connector = params ? `&${params}` : '';
    return `${this.apiUrl}${endpoint}?language=${this.language}${connector}`;
  }

  getPopularMovies() {
    return this.http.get<any>(this.buildUrl('/movie/popular'), {
      headers: this.headers
    });
  }

  searchMovies(query: string) {
    return this.http.get<any>(this.buildUrl('/search/movie', `query=${query}`), {
      headers: this.headers
    });
  }

  getMovieDetail(id: number) {
    return this.http.get<any>(this.buildUrl(`/movie/${id}`), {
      headers: this.headers
    });
  }

  getMovieVideos(id: number) {
    return this.http.get<any>(this.buildUrl(`/movie/${id}/videos?language=en-US`), {
      headers: this.headers
    });
  }
}
