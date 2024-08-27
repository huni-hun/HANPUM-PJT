package backend.hanpum.domain.member.entity;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.Review;
import backend.hanpum.domain.group.entity.GroupMember;
import backend.hanpum.domain.group.entity.LikeGroup;
import backend.hanpum.domain.member.enums.Gender;
import backend.hanpum.domain.member.enums.MemberType;
import backend.hanpum.domain.schedule.entity.Schedule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "login_id", unique = true)
    private String loginId;

    @Column(name = "password", length = 60)
    private String password;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "birth_date")
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(name = "nickname", unique = true, length = 8)
    private String nickname;

    @Column(name = "member_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Schedule> schedules = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Course> courses = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LikeGroup> likeGroups = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_member_id", unique = true)
    private GroupMember groupMember;

    public void updateGroupMember(GroupMember groupMember) {
        this.groupMember = groupMember;
    }

    public void updateNickname(String nickname){
        this.nickname = nickname;
    }

    public void updateName(String name){
        this.name = name;
    }

    public void updateBirthDate(Date birthDate){
        this.birthDate = birthDate;
    }

    public void updateGender(Gender gender){
        this.gender = gender;
    }

    public void updatePhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public void updateMemberPassword(String password){
        this.password = password;
    }

    public void updateProfilePicture(String profilePicture){
        this.profilePicture = profilePicture;
    }

    public void kakaoSingUpComplete(String nickname, Gender gender, Date birthDate,
                                    String phoneNumber, MemberType memberType){
        this.nickname = nickname;
        this.gender = gender;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.memberType = memberType;
    }
}