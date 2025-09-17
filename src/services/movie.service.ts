import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: MovieModel[] = [
    {
      id: 1,
      title: 'Demon Slayer: Kimetsu no Yaiba – Castillo infinito',
      description: 'Anime film sa spektakularnim borbama i vizuelnim efektima.',
      genre: 'Action, Adventure, Animation',
      duration: 117,
      director: 'Haruo Sotozaki',
      actors: ['Natsuki Hanae', 'Hiro Shimono', 'Yôko Hikasa'],
      releaseDate: '2025-09-05',
      posterUrl: '/assets/demon.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=x7uLutVRBfI',
      reviews: []
    },
    {
      id: 2,
      title: 'The Conjuring: Last Rites',
      description: 'Horor nastavak poznate franšize. Nadnaravni elementi i napetost.',
      genre: 'Horror',
      duration: 113,
      director: 'Michael Chaves',
      actors: ['Vera Farmiga', 'Patrick Wilson'],
      releaseDate: '2025-08-20',
      posterUrl: 'https://www.theconjuringmovie.com/assets/images/fullbanner.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=bMgfsdYoEEo',
      reviews: []
    },
      {
      id: 3,
      title: 'The Bad Guys 2',
      description: 'Nastavak animiranog hita – zlikovci planiraju veliku prevaru.',
      genre: 'Adventure, Animation, Comedy',
      duration: 100,
      director: 'Pierre Perifel',
      actors: ['Anthony Ramos', 'Ava Morse'],
      releaseDate: '2025-08-15',
      posterUrl: 'https://img.vwassets.com/paradiso.nz/vertical_b1e00fef-c1e3-480c-8ea9-706b50308890.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=TY1lWh20VSw',
      reviews: []
    },
    
    {
      id: 4,
      title: 'Materialists',
      description: 'Romantična komedija sa modernim zapletom.',
      genre: 'Romantic',
      duration: 105,
      director: 'Jane Doe',
      actors: ['Dakota Johnson', 'Pedro Pascal'],
      releaseDate: '2025-07-30',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmQxMTI1YmEtOGY3Yi00NzVlLWEzMjAtYTI1NWZkNDFiMDg1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=4A_kmjtsJ7c',
      reviews: []
    },
    {
      id: 5,
      title: 'How to Train Your Dragon: New Adventure',
      description: 'Porodični film – leteće zmajeve i nova avantura.',
      genre: 'Action, Adventure, Family',
      duration: 110,
      director: 'Dean DeBlois',
      actors: ['Jay Baruchel', 'America Ferrera'],
      releaseDate: '2025-09-10',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BODA5Y2M0NjctNWQzMy00ODRhLWE0MzUtYmE1YTAzZjYyYmQyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=22w7z_lT6YM',
      reviews: []
    },
    {
      id: 6,
      title: 'The Myth of Marakuda',
      description: 'Animirana fantastična priča.',
      genre: 'Animation',
      duration: 95,
      director: 'Carlos López',
      actors: ['Prokhor Chekhovskoy','Peter Ivaschenko'],
      releaseDate: '2025-06-20',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDNkYzZiMDUtMmYwYy00MTUzLTljZGMtZDBlZDU2OGE4NmZhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=1ks3euDDKRw',
      reviews: []
    },
    {
      id: 7,
      title: 'The Roses',
      description: 'Drama / komedija – ljubavne priče i prijateljstva.',
      genre: 'Comedy, Drama',
      duration: 120,
      director: 'Mary Smith',
      actors: ['Olivia Colman', 'Benedict Cumberbatch'],
      releaseDate: '2025-08-05',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzliNTEyYjEtNGE3Mi00ZDIzLTg1NzYtZDBhNTQ5ZDVkMmM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=XkgMaS5gbaA',
      reviews: []
    },
    {
      id: 8,
      title: 'Weapons',
      description: 'Mračan film sa elementima horora i detektivskog traga.',
      genre: 'Drama, Horror, Detective',
      duration: 130,
      director: 'John Doe',
      actors: ['Julia Garner', 'Josh Brolin'],
      releaseDate: '2025-07-15',
      posterUrl: 'https://miro.medium.com/1*tlsRIqYthU7YGMad070sOw.jpeg',
      trailerUrl:'https://www.youtube.com/watch?v=OpThntO9ixc',
      reviews: []
    },
    {
      id: 9,
      title: 'The Naked Gun',
      description: 'Komedija sa detektivskim zapletom.',
      genre: 'Comedy',
      duration: 97,
      director: 'David Zucker',
      actors: ['Liam Neeson', 'Pamela Anderson'],
      releaseDate: '2025-09-01',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGFlNDhkNzItZjgxNC00OGYzLWFjZDAtZTJmNDY5ZmEyZDc0XkEyXkFqcGc@._V1_.jpg',
      trailerUrl:'https://www.youtube.com/watch?v=uLguU7WLreA',
      reviews: []
    },
    {
      id: 10,
      title: 'Pearlescent Fog (Sedef magla)',
      description: 'Istorijski krimi-dramat po istoimenom romanu.',
      genre: 'Crime, Drama, History',
      duration: 140,
      director: 'Milorad Milinković',
      actors: ['Miloš Timotijević', 'Jana Ivanović', 'Petar Strugar'],
      releaseDate: '2025-07-19',
      posterUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgIEAoICAgKCgkIBwoHBwYGBxsICggWIB0iIiAdHx8kHCggJBolGx8fITEhJSkrLi4uIx8zODMsNygtLisBCgoKDg0OFQ8NDysZFRkrKysrKzctKzctNystLSstLSstNysrKysrKy0rNy0rKysrLSsrKysrKysrLSsrLSsrLf/AABEIAMgAhQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYHAf/EAEcQAAIBAwIDBAYIAgcFCQAAAAECAwAEEQUSEyEiMTJBUQYUQmGBkQcjUnGhscHRYqIVJDNTcpLhF0NjgsIlNERkc3SE8PH/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQADAQADAQACAwEAAAAAAAAAARECAxIhMUFRBCJhE//aAAwDAQACEQMRAD8A5EUA8QR/DS2nsz/LUmwHHI49qphZXTAOtvKU2LIrcI7ceBrphhQXGe2vQtTPC8ZZHRlZOlo5F2stJUIogqRJGWKoMZdlVdzbaOXSrs7iFj5dTN6yi+OPOmPaXChmaGQKveZoj0+P5VBmiDoS2l3WN4RCN23pnXcvLPn5Uw6PdkbwkYA3dTXSeePOoVR5CqIjMx6VWNdzN8KdiSEgyxAkp0x3KHs8x8qINM9/oq7BZNiAja21rler8edetot8CwMaZj7+25Xp5gY7e3nTnuVOR6pbDq70aH96jitLiQM8cEkiL0tJHEWVfj8qUHT1NHvHCsEjAbu7rpFb5E++mmwuI04rKnD28Tcs6tyzjwPnTXheM7ZEZD3trJtb5GmCM9oogUaUrzb288UU9tOo3vDIi7d25oiqsOz9agKUQVIttLGOdTxQSS5EaPIQu5ljTdtFKS3ljAZ43RT3WkQqrUoFIdxGefbSp22lSg6G23BDq06M8QbrjjbazD3VZG/tgNkYukjCbYo2n3bf9P8ASq/ZTgmfAZrWGVCL+a0n3PGkwmZtzyyv3qDiChlLgmMOu9V8vGpNnjS204KhhvYHDI8dwVZepVn6ZMAYz8fwqr2URtJom2tIJFLS3axNv28Noi3Llz/E/KiQdPLGWzg2PIk/GjlVuLBKF5e7yPvpXlxazqOidphFw1lll3KvUTy59mDRllp1pLv4lztCttikWItxhk5Pu5AfOpk0mzPI3G3Pd3Lu3dv61Pg6zO7B41aW15awKiKl0oO31lY7npbs3YHvx+XlRsek2ZaRJLoRhOHsZUMitknIznwwPvzSOlWeAwuBu2t9XsPgPP3nNHgFZqMsFxw3QSmTZ9bJcy8TdzPy5YoSIBSN4JTd1KvlV+2k2eAVuVLnpWNs7VPV2n4D51WXtukTskb70DMqSbdvEAJAOD2ZABpoGezXcMsbREXHEZV6eLujz93vOKr9hA+/vURsz4f81LZRApJp81tAG4gmWV22rJbNt6eXL8691C5tp0CILjcrsyceXcqjw5Z++oQmPurwx9mR/hqYOgpT3UqLKUqcChKQlyqKCWZtqqtan/Z5roQytHEMJxGhacbv/wBqm0tPr7b/ANzH+ddP+kfVr/TEsjYzmIzyzRysqhtwG39zVOmeZKzF2/0ea3OkcyJCFliWZFacbsEZFV+meiWp6hLdWUMcYlsW4dzxpQqqc4rrV3Fqk1haDSZBHeG1s24jMF5bOfbVF9GC3EkurXF0xecyxrPI3tNk5/KlWDhkNQ9ANasonupliMcK7n4c4ZsZ8vjREf0a68yq4SDmu5V9ZFdHvpHudOuZJG3M3GXd7hIQPwon0hi1ZreH+iJBHKqq0rMwXcuPfS7MVRxiw9GNUvWEUFnIcy8BpWQ8NT7z2VNq3ojq+mFhcWjsipxGngXiQqPvrs+hyyJZ2LkAvK0ay7l+03M/jR8rtJ61CyqUSDavT3sqc5pdmOnCPR/0U1DXON6ikZEG3i8WUR9ucflU2l+herai91DBEgexl4FzxZQqq3Pl+BrffRZCY/6SBGMyw/8AVW0s7GK1a6kQAG7uvWX+/AH55+dD06HhwfSvRHUtSlubS2ROJZMy3PElCqpzjtptr6JandXM2kokYubVWadZJQq4Hjn411f0KtBC+r3TDHrGrSRqze4n96Zb2nB1m5mAwLnSVm/ED9KqsfhzHVvQjV9MWKS4SMpNcrbI0UobqPZ+VG/7Nde8VgH/AMkVbelOq38uojTnnY2cWo27JbbRtU8v3roFzPItzawK2I5YLppY/tEbcfnTQ1DicfopqUl0+jqkfrUa8R/rfq1GM5zQutaJdaRL6reKofYsi8N9ysDXWtJtc6rq10R/Z20MKs3vAP6Gs79K9qC9ndAZEkDQbvuOf1pzwf4Ob7PdSojZ7qVSKh9goE1u2cAXMe5vjXVPTj0eudbS29Xlij9VaaV/WWK7gceQ91crVCKsv6X1jbwVv7rh7OHw/WG248u2qaM0zqM1rqE9jaQ6dcrb3ItbX69m8AnMcqh9BtHm0yK5ad0klubyRmkjYsrbSR+ea5xDrWsRKqJqN0qRqsaRrcttUeXbWhg9LZEs00+NJEuhu3ags+1ubFs/jUhGzaLpc0di9g7o0uyRmkVunvFqI1izv7qGKLT7kQSf72RmK7hjsrI6N6TzRQy292ZbiWbcqTzT7uGCMV7b3+o8w15Pjb0/XnsqWNZbNboywtb2tvx4zJbsqsqv1ZU+VG3LwQCeWSVF4kXUsjBewVgQsisrRs6urcRZI22tmhdR1KCI51G+QSbe7cz7pMfd21NKXG2/DR+gChfXj5vH+tX2n6gl0VRHDFbbiS/4s4/Q/OufaVq8DFksNRAeTvRwTmNpPh41ZWEF2rM1vLJGX78kbld1LsU+Np+mps4YraCTiuI1lvJp3kbp5l+X5Cny24N1DdDtNjNAzfEEfmayOqR3ygwPdSyRjq4ckpZaAe+1MbcXlxlF2r9eemqWkS00R6lpz3usMiMqt6wsu6Tu4UZ/Stzdr/W7I/8Alrz/AKawAiui/rQlk9ZLblud54n35qeR9SO2Z724MsassUjTnpB7RVpiNpbQJC+pXLsEWadd8zdO0Kg5/iaz30iWyT2UM8bCRYZ49kytu3KR2/lWTv8AUtUUSRPe3DRyblljacssn31WPqN/KgtXu5TbLt22zSnhrj3U6FK/ZSqfb7qVEFS29TDbVGA3tUWbBAoVRhva3VJbPE+0udrj+ajGZZAdhxj+ahsEig2EErtNExWpIDfy1Ym2Q4cH+WiEtycHbgBaGxpEdtZEgYI/iqxtYD3STj7NT2yAAZGKOtId7KrMAN3erLTLSM56YXl1ptlNdW/TLvjtkl/udx7a5RbJc3TbuuR5H3NLI27cfea7Z9KMMFtpU0Zi3tc3VrCkv92d27PyUj41hfRy1tnKrtG7au1m9qubk5J8O3+Px0CtPRvVwouYIt3D+sXgvtkXHjzrsfo/wbu1t7pRiSaBeKv2W9ofPNBads2mML7PTS9HLZra6vEC4t5YlkXavdYn5edTnkbfprzYTzf0W13YRyKSDnp6qo/UFJPKtPddI2rkUAIwDnzrbOjh1krEsUPIgAj2q8ms1IIAGRVqUA7BUM+MVomQ0YvW7AsOjGR3mrMSWzoeeS1dKubdXByorOahahScJjHdq0zNoyjB4yVZQTSq0kh2nxOf4aVVWKFjJaqnNcYH2qfICCjLyBX2afMrSY6ef8NF2lsuMOCD/FRRwns0SRQCoz9mp3TIIGAd1NwEwEIFSxuuGUt1faqGy0A6hqsGmRma4OTu4cUS96ZvKoNL9LIpnVJLRkRmVWnjn4nD9+MCufek2oyaneShJBwLR2hgVu7GB2t8SD+FdC9EfREXMMc11LLFJIu5YFwu0eGffWG9pG+ONtF36VXukX+n3Fhc6hFGbmBZLaSR9zblII5dvaMVy/Rri7twGgCMBu3NJ1KpFaX6R9JXSuEiGSVLhZJLPd/u5AOYP3jnXOtD1KZGkXPMtuWNu7WW0tKo6OJvLjOs6NJe6rBFdRyrb5uGjvIIu9y8AT51rdP4duWTPUEjVVZu9jP71zL0SvL3htZW7xhJZ+M0sidS1c6/M1y8FrJgyW0EkkssTHpcgYAPngZ+NLOfTXf9lDRelGvXkbrY6ZbxzXZtmuZ5J/7G2XsGfeTn5VzaX0t9KbSX+syM4Wfc0ccSsrDywB2VoNAv3gSNrqdDe6o3evVLSTBRtUbh7vPzrParf2rykBiZA7cVlTdGpzVY03qJVGT4s9a3GdM0TXLPV4le3lHrOziT2TIVkh++jhATzNcZsr67tby2eyYiSSWGPg7umbq7P0rvARRyxW6y0cupWv0VMtuwHKqLUbdiSCRitlLGpB5Vn9ShUknPIVeTLRjZAQSrMcqccq9qzurBCxODknnXlaQzpYW2njvYwf4qKNvgY25NWEYWqf0q16DQofWZIGmd24cECPt3H3n4iopaRFcxMvVjFQxkncM4zWXuPS7WJ2jnuLa2srNdrPZM269uF8hnJB8iVA++rCxvlMxjS+F3bTLC0UuwLwyVGeY9+eR7POl9+FPLSv4M1oujKl08LzbWk6kkkXunP710TQdO1W0mj9Y1R5RKrf1Zm3KuBkY+NY/j2gupnVhw2ueDxV7qsK1FqbiaeCU2sjLD0pPHdSQLIPfhCPxrh3Vpo9HjVymip9OzrkiW8OpNA7rdTT2vB6egDHPlnxrGrowh4EwXJLdSqv8Aae78a6PqNtJrMryxMZEtGa0Xd3Vx2/jnnWdliupiI7QxRJaytG1/ct0yNyyFGD2eeKrGdMWtZS/0AuLPVdPMSWqJDLetxINy9UKgf/fnRk9+sAVHcM4i4sskjbpJDjnn3nmKIXRPSS/PHjvoJDFA3AkaU7mx7IynafgKx009zIWE7uWDMzL3Wz45Fbrj88Zi+Vp+o3OrXdtp8P1jxieK1VrOORhujJAGR8OdYyG3jkPGDnmvVtald3cE8a8aJ5LmRtz3MsoZVHYBjw+BoD1xo1Ecf+b7NHDxvK/0vk5suX4aT0Yi4+oWLKNwhvLddv8AzZP4V28t21wzR/Su20DhpZWcNzc7Y2ub2ZzFuJ5sMns8BnHhVt/tX1E7v+zrPm68KTjttUZ5g+Zxnny+PZVxnPvedJJL38nW5X5VT3aoxIbFRafrUeqW8N/B0rcJuaHfu4bdhGfvzULO7e8H+WqyjDT/AAQzqnTz9mlUbwyEnl8hmvK0Mw+CbNY76SpriM2Mi5jiHGX1mNd0isdpwPfyGDWp04MRkipNb05r2IImC8T8RY29rlgistfDXKrjcOV24uo1EkNhaESrxFvdUl48i+8qen8D99Erc3kkMjvqzCIbofVNJgEce4jlnAAx4/CjraWxdmtXjR445W4Cy+XaMVYQ6lp1oZbKOGJo5IpNzK4+rfHIkY7c/nWHbTfp254sZy4Y/wBHS8he1ddwduIjMvj41s0ums4TZ2s8rSyL9azTnhwL4gDzP4VN6E6fZyRlpLYxyw9Ls3eb31d3OjW3J0XL7v8AMKvOU91rwjXJMxMbpKkRzRyqgjmjXeq9PE5eOOdZfWNbtNLY2NvGxSNtzcJOK248+1jW1SzWONOQz3e71KK5TqsmsxXc1oNRuBHx5FSSJ+HuAPkK05tKeIx4U+1tNPpnpOqbdlpdMP8A0h+9VOsOJLm4uhp8kcV/Au1pItvDYkbm+OD8zSsLvUt6RPeXgBbh8Rp2Zc/Otboz6uzKXvLqNCnRG059/M1jxuuI355nPbRzq40lo2IY8j3anuvR+GzgW7uptskzL6taKv1jL54ro9zoRlcXUzCZ1ZmX1lyysf4vEj3VS6x6K3U5aeSUyySdTSbf0roWdfDi/wCmX6jB+i2j219K/rYZo0baqq23cTW1130M0s20k2nII7y3iaZYI5eqYDt5edVFpoqW5ljmDcSFuIq+zzHLNbXTba1bbdBGZprOOGdWfpkwCOY+PPzrm22tfTv41l4Thnfo4e64F1GwxDHdfUM2eokcx8MD51tI2Ucmxz722qD0dYW0CpzXLySLHIu3hjOP0zVo9ynRuYAHq6a60nEedrS7OB52L49teUK5kfBTG3HLNKlAobEUgXe3PC91e833VmPSfXb4o0VqnCDdLtu+sx9/hRV3qAZQqMT1d6hVs1ucmRwSy7qrrFQ71xGPuXjVFudnOPasvbuzSh1pLhWs4LVkklTh8bd0qMjPL960ep2NqitGkQJ9pqq9LsEjLsiKrsrKnTuZazzx+02fO0oaHS7w28ccbvgleGsir1VeR6gseBcIFHs3Mf8AYt9/lWVW3uogqPJxAO6zLtopr/pCOG3BepWXpxWrSb/Rzp6X34X1xeEYOcKV3I3st7xWU1q1illW7G1WPU+3vMfOmm8RQVQbV37kiVt3PxPuoVnW4IiecRgrtWeVtq7s8s/PFRycbeWVw8nXad8JrmaVxGlqm6RZVk4m3cvxrU2l5IWUOmyRIF3qvnzNZjS7a6ikIkKYHUs8b7o2Hnmr62vYWdt46SzKrK3VkVl/H42ndI6P5vKt565Zci4LYBPZRSyHHPOPs0CrRkqFOc9XVU0lyYOQ8a6W1+Dg4+Nr6yk1ywUyK6L03S7Z1k7rEDkB8M16ln6nBMLZAkgs5JF4XeYgVZzvHcgM4UPGyssjLTESIFZA2HXp7vSwzzFcm0+1Z6XHpLHVMwOn3dzKETc5eH6v4VotPR5ABJnl9pqjv2sUluOHGFkkfduiyrKfyptte7cqWAxXWtXKODWJphs99JAeGWHLzpVn9R1Dc+cBuXbSogdiWxm4pKu/LdV0kqxLyINZeB1U5GQaNN1kd7sq3khaJb254jHJxju0PBM6EEDGaDnm57s1Gl6pIXx3VSQmzR+s5UDNDyNvBDGgTcqB286GmvvDNRB0kntnViqPHy/46/vURgYgF3jAb2Wl6qBnuckkGhDcEnHlVKkuF16oAMGSM7WXpWceNFwSNGI0WSLA+sXdLWdWY4POmtP248acFWbRdTkjOeJGw6V2xyhu2jYdRaTvtyrCQOV6s9lHR37rgDs3VDyWtmuuLzONvIfw1HJMxUsjNu21RRX6v2mrCK5UjGe2p6lrfpUXqSB2nJYE7vaoOC+Iyhq01AlwRVC8RXJ8aaTDWkgmR9xzzpUyPdgeFKqjM+yCOeeRr3c2ORqEy8/CvGlI8M1qZo8fe2RXiQnOcV4JwfZp3rAHhSD0lbIBGaDcMTT2nB8KYZFPhR4JtkTIx86SQ8+fZ7VOd1YYBIP2lqPZuyOI2T7NAIdhcBj2d5vaqNV3YYdhXdSC4BG84+zU0LoABjNEGOXlyFe9mKeHSnB08RThNPYORBBqzgfsyar1dBU8U6dmRTigk3Q2Qg+NBSxBjnNTGZfOoWmUVELbo+OFcdtKvFmTzFKqhJH6jIOeP5j+1Mks5B4D8f2rVerwDHRIR9ni96neqRsCywtj2frf9amlJGN9RuebCNsf4T+1NksrlO2Nu7ubpPSK3Hq4Oehl6erdcnqPz91Maz3E5Ln2dvHpUcMIba4PLhvk/wANWUD2yoiS6fJI/qc0StGgXaxOQ+e1sY7DWhmsFYdKlTv6WaU+dCPYjsCScmZV2v4c/fSdY04Vl/c2kyzLbaSbd32rF0CTa28t2nmORAx5EDwzXkFzZlpnfTHMb3lvJBHFEOlFIyMnOCR5eJqS4sXJfaZVwqtt4vePn4+QqBk9tUfYG3OvrR6vCpfhSdJ5bmzIKJpbRSOvDTbbLIsbZJOMnnkcufdxkczTXvLT6xotJZSeJwo2gVljPLacnywTjsO/+EUGzO2GCTqo3bttyO3P315HuU42yjp3NxrrbtOPdSGizi1LTgQ50QuhaSZlbp3dYYdnYAgxjxyefPlW6gUkMItrSWEpbLDKsnVxmHa3uz5e6nKACE2Pn2dtwezPZ8gPlSSJ2GTNIHG1d3rI25PPy99CcB5oHw5/7t+7u7vhXqLMDjY+f8PlVgEzhgDhlXb/AFo9Pb+mPlQ0aSMT1TD2maS5G1qfdi6IczSIAzowHd3MtCvMT41YNEHBVgWUbv8AxJ7fD9KAuVgtmVZI3fPU3X+2KFsTweLMR2mlTUuLD27dz5fWn9/ur2q7E9F+zoG0e7/NXpSlSoENKfdXhSlSoAaU91OEcRGHWTd/w36aVKmADe2kJDYS4Zj/AHc9VH9HsFl4iy56eBtc9vvFKlQC+kMNtbcKaN7aQ3Yl3LOsu1VTHZ247c0FbDS4luFv4pWlb/ubQv0x8vHHbnPwx49lKlUP4Xl+lVC0QP1qsw2N/Ztt5/KppGQ44QKr1e17/wBsUqVLI9EkELyZw4HT7VM4bKeec0qVUZ1npz5n/NTG59pJpUqAG4FKlSoA/9k=',
      trailerUrl:'https://www.youtube.com/watch?v=hSriz0UlgR4',
      reviews: []
    }
  ];

  
  getAllMovies(): MovieModel[] {
    return this.movies;
  }

  
  getMovieById(id: number): MovieModel | undefined {
    return this.movies.find(m => m.id === id);
  }

 
  searchMovies(criteria: Partial<MovieModel>): MovieModel[] {
    return this.movies.filter(movie => {
      return Object.entries(criteria).every(([key, value]) => {
        if (!value) return true; 
        const field = (movie as any)[key];

        
        if (Array.isArray(field)) {
          return field.some((actor: string) =>
            actor.toLowerCase().includes((value as string).toLowerCase())
          );
        }

       
        return String(field).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }
}
