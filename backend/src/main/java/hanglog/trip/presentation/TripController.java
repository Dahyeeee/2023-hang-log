package hanglog.trip.presentation;

import hanglog.trip.dto.request.TripCreateRequest;
import hanglog.trip.dto.request.TripUpdateRequest;
import hanglog.trip.service.TripService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trips")
public class TripController {

    private final TripService tripService;

    @PostMapping
    public ResponseEntity<Void> createTrip(@RequestBody @Valid final TripCreateRequest tripCreateRequest) {
        final Long tripId = tripService.save(tripCreateRequest);
        return ResponseEntity.created(URI.create("/trips/" + tripId)).build();
    }

    @PutMapping("/{tripId}")
    public ResponseEntity<Void> updateTrip(
            @PathVariable final Long tripId,
            @RequestBody @Valid final TripUpdateRequest updateRequest
    ) {
        tripService.update(tripId, updateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable final Long tripId) {
        tripService.delete(tripId);
        return ResponseEntity.noContent().build();
    }
}
