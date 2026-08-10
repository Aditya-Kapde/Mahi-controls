package com.indussource.config;

import com.indussource.model.Category;
import com.indussource.model.Product;
import com.indussource.model.User;
import com.indussource.repository.CategoryRepository;
import com.indussource.repository.ProductRepository;
import com.indussource.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedCategoriesAndProducts();
    }
    
    private void seedAdminUser() {
        String adminEmail = "admin@indussource.com";
        Optional<User> adminOpt = userRepository.findByEmail(adminEmail);

        if (adminOpt.isEmpty()) {
            User admin = User.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode("Admin@12345"))
                    .fullName("System Administrator")
                    .role(User.Role.ROLE_ADMIN)
                    .build();

            userRepository.save(admin);
            System.out.println("Default admin user created.");
        }
    }
    
    private void seedCategoriesAndProducts() {
        if (categoryRepository.count() == 0) {
            Category roadMachinery = categoryRepository.save(Category.builder()
                    .name("Road Construction Machinery")
                    .slug("road-construction-machinery")
                    .build());
                    
            Category electricalAutomation = categoryRepository.save(Category.builder()
                    .name("Electrical & Automation")
                    .slug("electrical-automation")
                    .build());
                    
            Category spareParts = categoryRepository.save(Category.builder()
                    .name("Spare Parts")
                    .slug("spare-parts")
                    .build());
                    
            Category industrialComponents = categoryRepository.save(Category.builder()
                    .name("Industrial Components")
                    .slug("industrial-components")
                    .build());
            
            System.out.println("Default categories created.");
            
            productRepository.save(Product.builder()
                    .title("Asphalt Drum Mix Plant")
                    .slug("asphalt-drum-mix-plant")
                    .category(roadMachinery)
                    .isFeatured(true)
                    .status(Product.ProductStatus.ACTIVE)
                    .shortDescription("High efficiency Asphalt Drum Mix Plant")
                    .build());
                    
            productRepository.save(Product.builder()
                    .title("PLC Control Panel for Batching Plant")
                    .slug("plc-control-panel-for-batching-plant")
                    .category(electricalAutomation)
                    .isFeatured(true)
                    .status(Product.ProductStatus.ACTIVE)
                    .shortDescription("Advanced PLC control system")
                    .build());
                    
            productRepository.save(Product.builder()
                    .title("Heavy-Duty Hydraulic Pump Bearing")
                    .slug("heavy-duty-hydraulic-pump-bearing")
                    .category(spareParts)
                    .isFeatured(false)
                    .status(Product.ProductStatus.ACTIVE)
                    .shortDescription("Durable replacement bearing")
                    .build());
                    
            productRepository.save(Product.builder()
                    .title("Variable Frequency Drive (VFD) 45kW")
                    .slug("variable-frequency-drive-vfd-45kw")
                    .category(industrialComponents)
                    .isFeatured(true)
                    .status(Product.ProductStatus.ACTIVE)
                    .shortDescription("Energy saving VFD")
                    .build());
                    
            System.out.println("Default products created.");
        }
    }
}
