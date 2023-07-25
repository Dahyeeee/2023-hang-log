package hanglog.trip.domain;

import static jakarta.persistence.CascadeType.REMOVE;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import hanglog.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLDelete(sql = "UPDATE day_log SET status = 'DELETED' WHERE id = ?")
@Where(clause = "status = 'USABLE'")
public class DayLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer ordinal;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @OneToMany(mappedBy = "dayLog", cascade = REMOVE)
    private List<Item> items = new ArrayList<>();

    public DayLog(
            final Long id,
            final String title,
            final Integer ordinal,
            final Trip trip,
            final List<Item> items
    ) {
        this.id = id;
        this.title = title;
        this.ordinal = ordinal;
        this.trip = trip;
        this.items = items;
    }

    public DayLog(
            final String title,
            final Integer ordinal,
            final Trip trip
    ) {
        this(null, title, ordinal, trip, new ArrayList<>());
    }

    public static DayLog generateEmpty(final Integer ordinal, final Trip trip) {
        return new DayLog(null, "", ordinal , trip , new ArrayList<>());
    }

    public void updateOrdinal(final Integer newOrdinal) {
        this.ordinal = newOrdinal;
    }
}
