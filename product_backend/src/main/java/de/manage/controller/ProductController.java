package de.manage.controller;

import de.manage.configuration.Message;
import de.manage.model.Product;
import de.manage.repository.ProductRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")

@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
  private ProductRepository productRepository;
  private Message message;

  public ProductController(ProductRepository productRepository, Message message) {
    this.productRepository = productRepository;
    this.message = message;
  }

  @GetMapping("/all")
  public List<Product> listAll() {
    List<Product> products = productRepository.findAll();
    if (products.size() == 0) {
      productRepository.save(new Product(1L, "Computer", 540));
      productRepository.save(new Product(2L, "Laptop", 799.99f));
      productRepository.save(new Product(3L, "Printer", 108.90f));
      productRepository.save(new Product(4L, "Table", 123.87f));
      productRepository.save(new Product(5L, "Pen", 23.54f));
    }
    return productRepository.findAll();
  }

  @PostMapping(value = "/add")
  public String save(@RequestBody Product product) {
    Product p = productRepository.save(product);
    return message.getSuccess();
  }

  @GetMapping("/detail")
  public Product getProductByName(@RequestParam("name") String name) {
    Optional<Product> product = productRepository.findByName(name);
    if (product.isPresent()) {
      return product.get();
    }
    return new Product();
  }

  @DeleteMapping("/delete/{id}")
  public String delete(@PathVariable("id") Long id) {
    Optional<Product> product = productRepository.findById(id);
    if (product.isPresent()) {
      this.productRepository.delete(product.get());
      return message.getSuccess();
    }
    return message.getError();
  }
}
