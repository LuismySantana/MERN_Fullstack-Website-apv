import mongoose from "mongoose";



const patientSchema = mongoose.Schema({
    petName: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    dischargeDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    veterinary: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Veterinary", // Para esto es que ponemos el nombre del modelo del Veterinario, para poder referenciarlo
        required: true
    }
},
{
    timestamps: true // Crea las columnas de "createdAt" y "updatedAt"
});


patientSchema.methods.getPublicData = function() {
    return {
        petName: this.petName,
        ownerName: this.ownerName,
        ownerEmail: this.ownerEmail,
        symptoms: this.symptoms,
        dischargeDate: this.dischargeDate,
        veterinary: this.veterinary,
        _id: this._id
    };
}


const Patient = mongoose.model("Patient", patientSchema, "patients");



export default Patient;