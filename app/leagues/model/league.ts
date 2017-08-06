export class League {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public thumbnail: string,
        public banner: string,
        public preferredAgeGroup?: AgeGroup,
        public preferredGender?: Gender,
        public preferredLanguage?: Language        
    ){}
    
    
}

class Language {
    constructor(
        public isForAll: boolean,
        public range?: string[]
    ){}
}

class AgeGroup{
    constructor(
        public isForAll: boolean,
        public range?: string[]
    ){}
}

class Gender {
    constructor(
        public isForAll: boolean,
        public genders?: string[]
    ){}
}