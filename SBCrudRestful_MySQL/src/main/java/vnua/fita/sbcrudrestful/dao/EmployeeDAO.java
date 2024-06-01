package vnua.fita.sbcrudrestful.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import jakarta.validation.ConstraintViolation;
import vnua.fita.sbcrudrestful.dto.request.EmployeeRequest;
import vnua.fita.sbcrudrestful.model.Employee;

@Repository
@Transactional
@Validated
public class EmployeeDAO {

    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private Validator validator;

    public Employee getEmployee(String empNo) {
        return empRepo.findById(empNo).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee addEmployee(EmployeeRequest emp) {
    	Employee employee=new Employee();
    	employee.setEmpName(emp.getEmpName());
    	employee.setEmpNo(emp.getEmpNo());
    	employee.setPosition(emp.getPosition());
        return empRepo.save(employee);
    }

    public Employee updateEmployee(@Valid Employee emp) {
        validateEmployee(emp);
        Employee existingEmp = empRepo.findById(emp.getEmpNo()).orElseThrow(() -> new RuntimeException("Employee not found"));
        existingEmp.setEmpNo(emp.getEmpNo());
        existingEmp.setEmpName(emp.getEmpName());
        existingEmp.setPosition(emp.getPosition());
        return empRepo.save(existingEmp);
    }

    public void deleteEmployee(String empNo) {
        if(empRepo.existsById(empNo)) {
        	empRepo.deleteById(empNo);
        }else {
        	throw new RuntimeException("Employee not found for empNo :: " + empNo);
        }
    }

    public List<Employee> getAllEmployees() {
        return empRepo.findAll();
    }

    private void validateEmployee(Employee emp) {
        var violations = validator.validate(emp);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<Employee> violation : violations) {
                sb.append(violation.getMessage()).append(", ");
            }
            throw new IllegalArgumentException("Validation failed: " + sb.toString());
        }
    }
}
