package com.booktracker.demo.service.ReadingProgress;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.booktracker.demo.repository.ReadingProgress.ReadingProgressRepository;
import com.booktracker.demo.model.ReadingProgress;

@Service
public class ReadingService {
   @Autowired
   private ReadingProgressRepository repository;
   
   public ReadingProgress updateProgress(Long progressId, Integer newPage) {
    ReadingProgress progress = repository.findById(progressId)
        .orElseThrow(() -> new ResourceNotFoundException("Progreso no encontrado"));

    if (newPage > progress.getBook().getTotalPages()) {
        throw new IllegalArgumentException("La pagina actual no puede exceder el número total de páginas");
    }

    progress.setCurrentPage(newPage);
    return repository.save(progress);
   }
}
