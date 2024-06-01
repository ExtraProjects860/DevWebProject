
class HistoricoJustificativa {
    constructor(id_funcionario, database) {
        this.id_funcionario = id_funcionario;
        this.db = database;
    }

    async registroDadosJustificativa(dataHoraJustificativa, descricaoJustificativa, documentoApoio) {
        try {
            const sql = `INSERT INTO HistoricoJustificativas 
                        (id_funcionario, dataJustificativa, descricaoJustificativa, documentoApoio)
                        VALUES (?, ?, ?, ?);
            `;

            const values= [
                this.id_funcionario,
                dataHoraJustificativa,
                descricaoJustificativa,
                documentoApoio,
            ];

            await this.db.query(sql, values);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = HistoricoJustificativa;