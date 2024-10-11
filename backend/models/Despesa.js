import mongoose from 'mongoose';

const DespesasSchema = new mongoose.Schema({
    categoria: { type: String, required: true},
    valor: { type: Number, required: true},
    descricao: { type: String},
    data: { type: Date, default: Date.now},
    usuarioId: { type: String, required: true}
});

const Despesa = mongoose.model('Despesa', DespesasSchema);
export default Despesa;