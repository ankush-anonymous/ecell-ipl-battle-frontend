import ParticipantNavbar from "../Components/ParticipantNavbar";
import ParticipantDashboard from "./ParticipantDashboard";

const RulesPage = () => {
  return (
    <>
      <ParticipantNavbar />
      <div className="mx-auto w-full max-w-7xl flex-1 p-4 text-white">
        <div className="space-y-4">
          <h1 className="font-seymour text-xl">Rules</h1>
          <ul className="list-inside list-decimal">
            <li>
              Every participant must be a part of ONLY 1 team. Violation of this
              rule will lead to the disqualification of both teams.
            </li>
            <li>
              All participants must be present for the entire duration of the
              event.
            </li>
            <li>
              In case of any discrepancy, the decision of the auctioneer stands
              final.
            </li>
            <li>
              Bidding must be carried out in a disciplined manner, with no
              unnecessary commotion or disruptions.
            </li>
            <li>
              Failure to satisfy the rules will lead to disqualification of the
              team.
            </li>
          </ul>
          <h1 className="pt-4 font-seymour text-xl">Round 1</h1>
          <ul className="list-inside list-decimal">
            <li>
              The participants will attempt a total of 30 MCQs (Multiple Choice
              Questions) within 15 minutes.
            </li>
            <li>
              Navigating out of the portal will lead to the disqualification of
              the team.
            </li>
            <li>
              The marking scheme is +1 for every correct answer with no negative
              markings involved.
            </li>
            <li>
              The team with most points will get to select their desired IPL
              team that they will bid for, then the team with second points, and
              so forth.
            </li>
          </ul>
          <h1 className="pt-4 font-seymour text-xl">Round 2</h1>
          <ul className="list-inside list-decimal">
            <li>A budget of 70 crores will be allotted to every team.</li>
            <li>
              A team must buy a minimum of 16 players and a maximum of 18
              players.
            </li>
            <li>
              Each bid will begin with a fixed minimum price according to the
              player&apos;s value.
            </li>
            <li>There will be no upper limit in the bidding of any player.</li>
            <li>
              Any team exceeding the allowed digital amount will not be
              permitted to participate in the bidding process.
            </li>
            <li>
              Players are rated out of 50. These ratings are fixed and will not
              be changed.
            </li>
            <li>There will be no reauctioning of any player in any case.</li>
            <li>
              The following are the team selection criteria for moving on to the
              next round:
            </li>
            <li>The team should consist of at least: </li>
            <div className="ml-4">
              <ul className="list-inside list-disc">
                <li>Wicket Keepers: 2</li>
                <li>Batsman: 3</li>
                <li>All-rounders: 3</li>
                <li>Bowlers: 4</li>
              </ul>
            </div>
            <li>The team should have a maximum of 7 foreign players.</li>
            <li>
              Teams can gain additional points by buying star players (+5 points
              for every star player).
            </li>
            <li>
              All teams will be judged based on their top 16 players. From each
              auctioning room, the team with the maximum points will proceed to
              round 3. In case of a tie, the team with the maximum remaining
              balance amount will be selected.
            </li>
          </ul>
          <h1 className="pt-4 font-seymour text-xl">Round 3</h1>
          <ul className="list-inside list-decimal">
            <li>
              Each team should make their playing 11 from the players chosen in
              Round 2 according to the following criteria:
            </li>
            <div className="ml-4">
              <ul className="list-inside list-disc">
                <li>At most 5 foreign players</li>
                <li>At least 2 all-rounder</li>
                <li>At least 1 Wicket Keeper</li>
                <li>At least 3 Bowlers</li>
                <li>At least 3 batsmen</li>
              </ul>
            </div>
            <li>
              Evaluation criteria:
              <div className="ml-4">
                <ul className="list-inside list-disc">
                  <li>
                    The sum of playing 11 players&apos; individual ratings will
                    be calculated.
                  </li>
                  <li>
                    In case of a tie, the remaining balance will be taken into
                    consideration.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RulesPage;
