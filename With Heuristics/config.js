var map;
var conf = {
    canvas: {
        width: 800,
        height: 600
    },
    cell: {
        width: 40,
        height: 40,
        kinds: {
            '0': {
                color: '#000',
                penalty: 1
            },
            '1': {
                color: '#ff5',
                penalty: 0.5
            },
            '2': {
                color: '#808080',
                penalty: 0.2
            },
            '3': {
                color: '#569856',
                penalty: 0.4
            },
            '4': {
                color: '#afdafd',
                penalty: 0.9
            },
            '5': {
                color: '#fff',
                penalty: 0
            }
        }
    }
}