const baseQuery = require('./baseQuery');

class Series {
    lista() {
        return baseQuery('select * from series');
    }

    insere(serie) {
        return  baseQuery("insert into series set ? ", serie);
    }

    buscaPorId(id){
        return baseQuery('select * from series where id = ?', id);
    }

    delete(id){
        return baseQuery('delete from series where id = ?', id);
    }

    atualiza(serie) {
        return baseQuery("update series set ? where id = ?", [serie, serie.id]);
    }
}

module.exports = Series;