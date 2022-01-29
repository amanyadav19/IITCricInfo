DROP TABLE IF EXISTS owner CASCADE;
DROP TABLE IF EXISTS umpire CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS umpire_match CASCADE;
DROP TABLE IF EXISTS match CASCADE;
DROP TABLE IF EXISTS player CASCADE;
DROP TABLE IF EXISTS ball_by_ball CASCADE;
DROP TABLE IF EXISTS venue CASCADE;
DROP TABLE IF EXISTS player_match CASCADE;
DROP FUNCTION IF EXISTS get_sum_stakes CASCADE;
DROP FUNCTION IF EXISTS count_role_desc CASCADE;
DROP FUNCTION IF EXISTS get_capacity CASCADE;


-- owner
CREATE FUNCTION get_sum_stakes ( field INT)
RETURNS INT
language plpgsql
AS 
$$
BEGIN
    RETURN (SELECT sum(owner.stake) FROM owner group by owner.team_id having owner.team_id = field);
END;
$$;

CREATE TABLE team (
    team_id INT ,
    team_name TEXT,
    Primary key(team_id)
);

CREATE TABLE owner (
    owner_id INT ,
    owner_name TEXT,
    owner_type TEXT,
    team_id INT,
    stake INT CHECK(stake between 1 and 100),
    Primary key(owner_id),
    FOREIGN KEY(team_id) references team on delete set null,
    check(get_sum_stakes(team_id) + stake >= 1 AND get_sum_stakes(team_id) + stake <= 100)
);

CREATE TABLE umpire (
    umpire_id INT ,
    umpire_name TEXT,
    country_name TEXT,
    Primary key(umpire_id)
);


--Player information
CREATE TABLE player (
    player_id INT,
    player_name TEXT,
    dob DATE,
    batting_hand TEXT,
    bowling_skill TEXT,
    country_name TEXT,
    Primary Key(player_id)
);

--Venue information
CREATE TABLE venue (
    venue_id INT,
    venue_name TEXT,
    city_name TEXT,
    country_name TEXT,
    capacity INT,
    Primary Key(venue_id)
);



CREATE FUNCTION get_capacity ( id INT)
RETURNS INT
language plpgsql
AS 
$$
BEGIN
    RETURN (select venue.capacity from venue where venue.venue_id = id);
END;
$$;

--Match information
CREATE TABLE   match (
    match_id INT,
    season_year INT, 
    team1 INT,
    team2 INT,
    venue_Id INT,
    toss_winner INT,
    match_winner INT,
    toss_name TEXT CHECK(toss_name='field' or toss_name='bat'),
    win_type TEXT CHECK(win_type='wickets' or win_type='runs' or win_type IS NULL),
    man_of_match INT,
    win_margin INT,
    attendance INT,
    PRIMARY KEY(match_id),
    FOREIGN KEY(venue_id) references venue on delete set null,
    FOREIGN KEY(team1) references team on delete set null,
    FOREIGN KEY(team2) references team on delete set null,
    FOREIGN KEY(toss_winner) references team on delete set null,
    FOREIGN KEY(match_winner) references team on delete set null,
    FOREIGN KEY(man_of_match) references player on delete set null,
    check(attendance <= get_capacity(venue_id))
);

CREATE FUNCTION count_role_desc ( id INT, field TEXT)
RETURNS INT
language plpgsql
AS 
$$
BEGIN
    RETURN (select count(umpire_match.role_desc) from umpire_match where umpire_match.match_id = id and umpire_match.role_desc = field);
END;
$$;

CREATE TABLE umpire_match (
    umpirematch_key BIGINT,
    match_id INT,
    umpire_id INT,
    role_desc TEXT CHECK(role_desc='Field' or role_desc='Third'),
    Primary key(umpirematch_key),
    FOREIGN KEY(match_id) references match on delete set null,
    FOREIGN KEY(umpire_id) references umpire on delete set null,
    check((role_desc = 'Field' AND  count_role_desc(match_id, 'Field') <= 1) OR (role_desc = 'Third' AND count_role_desc(match_id, 'Third') = 0))
);

CREATE TABLE player_match (
    playermatch_key BIGINT,
    match_id INT,
    player_id INT,
    role_desc TEXT CHECK(role_desc='Player' or role_desc='Keeper' or role_desc='CaptainKeeper' or role_desc='Captain'),
    team_id INT,
    PRIMARY KEY(playermatch_key),
    FOREIGN KEY(match_id) references match on delete set null,
    FOREIGN KEY(player_id) references player on delete set null,
    FOREIGN KEY(team_id) references team on delete set null
     
);

--Information for each ball
CREATE TABLE ball_by_ball (
    match_id INT,
    innings_no INT CHECK(innings_no=1 or innings_no=2),  
    over_id INT,
    ball_id INT,
    runs_scored INT CHECK(runs_scored between 0 and 6),
    extra_runs INT,
    out_type TEXT CHECK(out_type='caught' or out_type='caught and bowled' or out_type='bowled' or out_type='stumped' or out_type='retired hurt' or out_type='keeper catch' or out_type='lbw'or out_type='run out' or out_type='hit wicket' or out_type IS NULL),
    striker INT,
    non_striker INT,
    bowler INT,
    PRIMARY KEY(match_id, innings_no, over_id,ball_id),
    Foreign Key (match_id) references match on delete set null,
    Foreign Key(striker) references player on delete set null,
    Foreign Key(non_striker) references player on delete set null,
    Foreign Key(bowler) references player on delete set null
);
