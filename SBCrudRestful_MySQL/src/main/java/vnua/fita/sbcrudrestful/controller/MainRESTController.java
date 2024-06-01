package vnua.fita.sbcrudrestful.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vnua.fita.sbcrudrestful.dao.EmployeeDAO;
import vnua.fita.sbcrudrestful.dto.request.EmployeeRequest;
import vnua.fita.sbcrudrestful.model.Employee;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/employees")
@CrossOrigin
public class MainRESTController {

	@Autowired
	private EmployeeDAO employeeDAO;

	@GetMapping("")
	public List<Employee> getEmployees() {
		List<Employee> list = employeeDAO.getAllEmployees();
		return list;
	}

	@GetMapping("/{empNo}")
	public ResponseEntity<?> getEmployee(@PathVariable("empNo") String empNo) {
		Employee employee = employeeDAO.getEmployee(empNo);
		if (employee == null) {
			return ResponseEntity.badRequest().body("Employee not found");
		}
		return ResponseEntity.ok(employee);
	}

	@PostMapping("")
	public ResponseEntity<?> addEmployee(@Valid @RequestBody EmployeeRequest emp) {

		return ResponseEntity.ok(employeeDAO.addEmployee(emp));
	}

	@PutMapping("")
	public ResponseEntity<?> updateEmployee(@RequestBody Employee emp, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().body(result.getAllErrors().stream()
					.map(error -> error.getDefaultMessage()).collect(Collectors.joining(", ")));
		}

		System.out.println("(Service Side) Editing employee: " + emp.getEmpNo());

		return ResponseEntity.ok(employeeDAO.updateEmployee(emp));
	}

	@DeleteMapping("/{empNo}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable String empNo) {
		try {
			employeeDAO.deleteEmployee(empNo);
			return ResponseEntity.noContent().build();
		} catch (RuntimeException e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}