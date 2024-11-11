const Employee = require('./employee')
const Designation = require('./designation')

Employee.belongsTo(Designation, {
    foreignKey: 'designation_id',
    as: 'designation'
});
Designation.hasMany(Employee, {
    foreignKey: 'designation_id',
    as: 'employee'
});

module.exports = {
    Employee,
    Designation
}