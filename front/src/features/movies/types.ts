export type Movie = {
  _id: string;
  title: string;
  director: string;
  category: string;
  releaseDate: string;
  rating: number;
};

export type MovieFormData = {
  title: string;
  director: string;
  category: string;
  releaseDate: string;
  rating: string;
};

export const emptyMovie: MovieFormData = {
  title: '',
  director: '',
  category: '',
  releaseDate: '',
  rating: '',
};

export const posters = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDayhRNsfMRQpE2mfI3yecVRvrifRWtmuw-RYSZ9-nifo1gDar4qCuCeODLzJ7UBpNSlqLF5PeI7Gkg9GSi2R8-4Ylq_tc5WyNoLFEZiLCnbMgOTZEEw7ACkHzl3F7nT-n_Q_1zZwLvCzXwFwnXN6OC1Hrs4HJ8KHkUAQH1WSkOUoRtubGWEbt6gespkZzA2xpwZR0cql0-H_WIeYORvKafNeVDJEZtulDR3xLulT_35T4nLYxTq2YHdvmmOt9o1BVdaYslWMx-6ME',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkt4kkLiPG5d-HLW1w6dh-P92CLbMq0NoVB9d6xuUqHVkRIQSvOAqEcc0EDc8JTDS-wmchGSDWlVLB8ENT3NDM3eZEjujO8fKUvunZKy1VZZUvF2-v-rjX4BzrjjTBJ_pY5l5sl0j8kRT6Wl7Uh7yCC9ryBr7QnAFZ87z7N1J91MQ6Q03VCVqZTSWtxIo0Ssl00ybuzns0iHEnEO7Whr7Lb6pQqA4gEoWTe8FFziJZBUNJ6QElFGBsa7-2Stwpq1mX9gAfhT-m0Mk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBja80OydzDgQ1FIxPjKXoQvl9cQLX7YDLtpDevEaiQy0RbXTJFnrTJ8fA2t31jnUIzIV5Yqut_E72LSvHnz_ptyQmqHJahuERre2KnX4lyPm1FaBpvJp73A3oSUFgo0DIPxF-RlAkG2CHWCyYFGRsqyNUb4AD_S04Kr5Qg9SMbMPiHILIDfsv4Y7lpG6ZX48n3wIclO9h6un2toeKamMCsb6CmTChxlXIgIF9wU8NWMIdHIR3k9rly30aE6N9_IHmpDgXh8J3dbCQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAyLgciTtUAkpqA3XH8LJdBT4ZuI9JDT5AxyslZHJ6aq7bkkCNiyrx25xOiLyPWXIIDMSd1gjNmDXdiLZ1hcqPujHipEya1WcDAsKRTuHv5Gb7sNRUw-gs0JyEralJSicGR7nJSAzWYuyulQclkVZZ8oMqSDIGwbZfAMSEQ5k9xz0LVXaPZAJYS2m-ZZ_XdhVOlPVZGiTqtIosKW4rmnTmGNXnph6j2HWpcmzTUcq5LeeLNPt0hRxrK3aIc3mUT2dQ0v-oSSUmRJwA',
];
