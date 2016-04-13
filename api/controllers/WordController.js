module.exports = {
    get: function (req, res) {
        var words = [
            {
                word: 'car',
                translation: 'Автомобіль'
            },
            {
                word: 'cat',
                translation: 'Кіт'
            },
            {
                word: 'test',
                translation: 'Тест'
            },
            {
                word: 'yolo',
                translation: 'Йоло'
            },
            {
                word: 'dog',
                translation: 'Dog'
            },
            {
                word: 'Longon',
                translation: 'Лондон'
            },
            {
                word: 'russian',
                translation: 'Москаль'
            },
            {
                word: 'invaders',
                translation: 'Москалі'
            }
        ];
        res.json(words);
    }
};