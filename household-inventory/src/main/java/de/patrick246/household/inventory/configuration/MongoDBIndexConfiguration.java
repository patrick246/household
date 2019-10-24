package de.patrick246.household.inventory.configuration;

import de.patrick246.household.inventory.entity.Item;
import de.patrick246.household.inventory.entity.Picture;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.IndexOperations;
import org.springframework.data.mongodb.core.index.IndexResolver;
import org.springframework.data.mongodb.core.index.MongoPersistentEntityIndexResolver;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MongoDBIndexConfiguration {

    private final MongoTemplate mongoTemplate;
    private final MongoMappingContext mongoMappingContext;

    @EventListener(ApplicationReadyEvent.class)
    public void initIndicesAfterStartup() {
        Class[] entities = {Item.class, Picture.class};

        for (Class c : entities) {
            IndexOperations indexOps = mongoTemplate.indexOps(c);
            IndexResolver resolver = new MongoPersistentEntityIndexResolver(mongoMappingContext);
            resolver.resolveIndexFor(c).forEach(indexOps::ensureIndex);
        }
    }
}
