package backend.hanpum.domain.test;

import backend.hanpum.domain.group.repository.custom.GroupRepositoryCustom;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseWarmup implements ApplicationRunner {


    private final GroupRepositoryCustom groupRepositoryCustom;

    public DatabaseWarmup(GroupRepositoryCustom groupRepositoryCustom) {
        this.groupRepositoryCustom = groupRepositoryCustom;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        groupRepositoryCustom.findGroupById(0L,0L);
    }
}
