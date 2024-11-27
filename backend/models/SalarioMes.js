import mongoose from "mongoose";

const SalarioMesSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true},
    mes: { type: String, required: true},
    salario: { type: Number, required: true},
});

export default mongoose.model('SalarioMes', SalarioMesSchema);