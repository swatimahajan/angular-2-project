"use strict";
var League = (function () {
    function League(id, name, description, thumbnail, banner, preferredAgeGroup, preferredGender, preferredLanguage) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.banner = banner;
        this.preferredAgeGroup = preferredAgeGroup;
        this.preferredGender = preferredGender;
        this.preferredLanguage = preferredLanguage;
    }
    return League;
}());
exports.League = League;
var Language = (function () {
    function Language(isForAll, range) {
        this.isForAll = isForAll;
        this.range = range;
    }
    return Language;
}());
var AgeGroup = (function () {
    function AgeGroup(isForAll, range) {
        this.isForAll = isForAll;
        this.range = range;
    }
    return AgeGroup;
}());
var Gender = (function () {
    function Gender(isForAll, genders) {
        this.isForAll = isForAll;
        this.genders = genders;
    }
    return Gender;
}());
//# sourceMappingURL=league.js.map