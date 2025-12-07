package com.ipa.backend.repository;

import com.ipa.backend.model.Semente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SementeRepository extends JpaRepository<Semente, Long> {
    
    List<Semente> findByTipo(String tipo);
    
    List<Semente> findByCultura(String cultura);
    
    List<Semente> findByAtivo(Boolean ativo);
    
    List<Semente> findByTipoAndCultura(String tipo, String cultura);
    
    List<Semente> findByNomeContainingIgnoreCase(String nome);
    
    List<Semente> findByAtivoTrueOrderByNomeAsc();
}